import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/signup');
    }

    return (
        <div>
            <img src='https://yt3.ggpht.com/ytc/AMLnZu907ujnXt1ae1wVUDH8NrYtoLeeI5XCK7OsMU3HCw=s900-c-k-c0x00ffffff-no-rj'
            alt="logo"
            className="logo"
            />
            {auth ? <ul className="nav-ul">
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                <li><Link to="/update">Update Product</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link onClick={logout} to="/signup">Logout({JSON.parse(auth).name})</Link></li>

                {/* <li>{auth ? <Link onClick={logout} to="/signup">Logout</Link> :
                    <Link to="/signup">Sign Up</Link>}</li>
                <li><Link to="/login">Login</Link></li> */}

                {/* {
                        auth ? <li><Link onClick={logout} to="/signup">Logout</Link></li>
                            : <>
                                <li> <Link to="/signup">Sign Up</Link></li>
                                <li><Link to="/login">Login</Link></li>
                            </>
                    } */}
            </ul>
                :
                <ul className="nav-ul nav-right">
                    <li> <Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            }
        </div>
    );
}
export default Nav;
