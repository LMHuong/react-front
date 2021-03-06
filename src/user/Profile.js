import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import { read } from './apiUser';
import DefaultProfile from '../images/avatar.png';
import DeleteUser from './DeleteUser';
import FollowProfileButton from './FollowProfileButton';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            user: {
                following: [],
                followers: []
            },
            redirectToSignin: false,
            following: false

        }
    }

    // check if user's already following
    checkFollow = (user) => {
        const jwt = isAuthenticated();
        const match = user.followers.find(follower => {
            // onhe user can have many followers and vice versa
            return follower._id === jwt.user._id;
        })
        return match;
    }

    init = (userId) => {
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
            if (data.error) {
                this.setState({ redirectToSignin: true });
            }
            else {
                let following = this.checkFollow(data);
                this.setState({ user: data, following });
            }
        })
    }

    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.init(userId);
    }

    componentWillReceiveProps(props) {
        const userId = props.match.params.userId;
        this.init(userId);
    }

    render() {

        const { redirectToSignin, user } = this.state;
        if (redirectToSignin) return <Redirect to="/signin" />
        const photoUrl = user._id ? `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}` : DefaultProfile;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Profile</h2>
                <div className="row">
                    <div className="col-md-6">
                        <img style={{ height: "200px", width: "auto" }} className="img-thumbnail" src={photoUrl} onError={i => (i.target.src = `${DefaultProfile}`)} alt={user.name} />
                    </div>
                    <div className="col-md-6">
                        <div className="lead mt-2">
                            <p>Hello, {user.name}</p>
                            <p>Email: {user.email}</p>
                            <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
                        </div>
                        {isAuthenticated().user && isAuthenticated().user._id === user._id ? (
                            <div className="d-inline-block">
                                <Link className="btn btn-raised btn-success mr-5" to={`/user/edit/${user._id}`}>
                                    Edit Profile
                                </Link>
                                <DeleteUser userId={user._id} />

                            </div>
                        ) : (
                            <p>{this.state.following ? 'following' : 'not following'}</p>
                        )}

                    </div>
                </div>
                <div className="row">
                    <div className="col md-12 mt-5 mb-5">
                        <hr />
                        <p className="lead">
                            {user.about}
                        </p>
                        <hr />
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;