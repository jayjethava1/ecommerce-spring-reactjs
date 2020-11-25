import React, {useEffect, useState} from 'react';
import ShopService from "../../../services/ShopService";
import {Link} from "react-router-dom";
import AccountNavbar from "../../parts/account-navbar/AccountNavbar";

function OrdersList(props) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("userRole") === "ADMIN") {
            ShopService.getAllOrders()
                .then((response) => {
                    setOrders(response.data);
                });
        } else {
            ShopService.getUserOrders()
                .then((response) => {
                    setOrders(response.data);
                });
        }
    }, []);

    return (
        <div>
            <AccountNavbar/>
            <div className="container">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Order no.</th>
                        <th scope="col">Date</th>
                        <th scope="col">Customer</th>
                        <th scope="col">Address</th>
                        <th scope="col">Postcode</th>
                        <th scope="col">Products</th>
                        <th scope="col">Amount, RS</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    {orders.map((order) => {
                        return (
                            <tbody>
                            <tr>
                                <th>{order.id}</th>
                                <th>{order.date}</th>
                                <th>{order.firstName + " " + order.lastName}</th>
                                <th>{order.city + " " + order.address}</th>
                                <th>{order.postIndex}</th>
                                <th>
                                    {order.perfumeList.map((perfume) => {
                                        return (
                                            <p>Id product:
                                                <Link to={`/product/${perfume.id}`}>{perfume.id}</Link>
                                            </p>
                                        )
                                    })}
                                </th>
                                <th>{order.totalPrice}</th>
                            </tr>
                            </tbody>
                        )
                    })}
                </table>
            </div>
        </div>
    );
}

export default OrdersList;