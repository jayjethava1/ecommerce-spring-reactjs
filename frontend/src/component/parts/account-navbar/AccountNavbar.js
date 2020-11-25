import {Link} from "react-router-dom";
import React from "react";

function AccountNavbar(props) {
    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarText"
                        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                </button>
                {(localStorage.getItem("userRole") === "ADMIN") ?
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to={"/admin/orders"}><a className="nav-link text-light mx-3">List of all
                            orders</a></Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/admin/users/all"}><a className="nav-link text-light mx-3">a list of users</a></Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/admin/add"}><a className="nav-link text-light mx-3">Add product</a></Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/product/list/edit"}><a className="nav-link text-light mx-3">List
                            goods</a></Link>
                        </li>
                    </ul>
                    :
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link to={"/user/edit"}><a className="nav-link text-light mx-3">Change Password</a></Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/user/orders"}><a className="nav-link text-light mx-3">Order list</a></Link>
                        </li>
                    </ul>
                }
            </nav>
        </div>
    )
}

export default AccountNavbar;