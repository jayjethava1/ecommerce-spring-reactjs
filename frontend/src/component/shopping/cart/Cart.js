import React, {useEffect, useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import {IMG_URL} from "../../../constants/index";
import Spinner from "../../parts/spinner/Spinner";
import ShopService from "../../../services/ShopService";

function Cart(props) {
    const [perfumes, setPerfumes] = useState([]);
    const [load, setLoad] = useState(false);

    let totalCartPrice = 0;
    perfumes.map(perfume => totalCartPrice = totalCartPrice + perfume.price)

    useEffect(() => {
        ShopService.getCart()
            .then((response) => {
                setPerfumes(response.data)
                props.setCartItems(response.data.length)
                setLoad(true)
            });
    }, [])

    const removeFromCart = (perfumeId) => {
        const perfume = perfumes.find((perfume) => perfume.id === perfumeId)

        ShopService.removeFromCart(perfume)
            .then((response) => {
                setPerfumes(response.data)
                props.setCartItems(response.data.length)
            });
    }

    if (!localStorage.getItem("isLoggedIn")) {
        return <Redirect to="/login"/>
    }

    return (

        <div className="container mt-5 pb-5">
            {load ? <div>
                    {perfumes.length === 0 ?
                        <div style={{textAlign: "center"}}>
                            <h2>Cart is empty</h2>
                        </div> :
                        <div>
                            <p className="h4 mb-4 text-center">Basket</p>
                            {perfumes.map((perfume) => {
                                return (
                                    <div className="card mb-3 mx-auto" style={{maxWidth: "940px"}}>
                                        <div className="row no-gutters">
                                            <div className="col-3 ml-3 mt-3">
                                                <img src={IMG_URL + `${perfume.filename}`}
                                                     className="rounded mx-auto w-50"/>
                                            </div>
                                            <div className="col-6">
                                                <div className="card-body">
                                                    <h5 className="card-title">{perfume.perfumer + " " + perfume.perfumeTitle}</h5>
                                                    <p className="card-text">{perfume.type}</p>
                                                    <p className="card-text"><span>{perfume.volume}</span> ml.</p>
                                                </div>
                                            </div>
                                            <div className="col-2">
                                                <div className="card-body">
                                                    <h5 className="card-title">₹<span>{perfume.price}</span>/-</h5>
                                                    <button className="btn btn-warning mb-2"
                                                            onClick={() => removeFromCart(perfume.id)}>Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            <hr className="my-3"/>

                            <div className="row">
                                <div className="col-9">
                                    <p className="h5 text-right">Total: <span>₹{totalCartPrice}</span>/-
                                    </p>
                                </div>
                                <div className="col-3">
                                    <div className="form-row">
                                        <Link to={"/order"}>
                                            <button className="btn btn-success">Checkout</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                : <Spinner/>
            }
        </div>
    );
}

export default Cart;