import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';

const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: "ff9900" };
    else return { color: "#ffffff" };
}


const Menu = ({ history }) => (
    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                {/* <NavLink className="nav-link" exact to="/" activeStyle={{ fontWeight: "bold", color: "white" }}>Home</NavLink> */}
                <Link className="nav-link" style={isActive(history, '/')} to="/">Home</Link>
            </li>

            <li className="nav-item">
                {/* <NavLink className="nav-link" exact to="/" activeStyle={{ fontWeight: "bold", color: "white" }}>Home</NavLink> */}
                <Link className="nav-link" style={isActive(history, '/users')} to="/users">Users</Link>
            </li>

            {!isAuthenticated() && (
                // react fragment
                <>
                    <li className="nav-item">
                        {/* <NavLink className="nav-link" exact to="/signin" activeStyle={{ fontWeight: "bold", color: "white" }}>Signin</NavLink> */}
                        <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">Signin</Link>
                    </li>
                    <li className="nav-item">
                        {/* <NavLink className="nav-link" exact to="/signup" activeStyle={{ fontWeight: "bold", color: "white" }}>Signup</NavLink> */}
                        <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">Signup</Link>
                    </li>
                </>

            )}

            {isAuthenticated() && (
                <>
                    <li className="nav-item">
                        {/* <NavLink className="nav-link" onClick={()=> signout(()=>history.push('/'))} activeStyle={{ fontWeight: "bold", color: "white" }}>Signup</NavLink> */}
                        <a
                            className="nav-link"
                            style={{ color: "white" }}
                            onClick={() => signout(() => history.push('/'))}>Sign out</a>
                    </li>
                    <li className="nav-item">
                        <Link to={`/user/${isAuthenticated().user._id}`} style={isActive(history, `/user/${isAuthenticated().user._id}`)} className="nav-link">
                            {`${isAuthenticated().user.name}'s profile`}</Link>

                    </li>
                </>
            )}
        </ul>
    </div>
)

export default withRouter(Menu);

