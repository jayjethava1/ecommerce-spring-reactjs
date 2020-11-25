import React, {useEffect, useState} from 'react';
import ShopService from "../../../services/ShopService";
import {IMG_URL} from "../../../constants/index";
import ReactImageMagnify from 'react-image-magnify';

function Product(props) {
    const [id] = useState(props.match.params.id);
    const [perfume, setPerfume] = useState({});

    useEffect(() => {
        window.scrollTo(0, 0);
        ShopService.getPerfumeById(id)
            .then((response) => {
                setPerfume(response.data)
            });
    }, [])

    const addToCart = () => {
        if (!localStorage.getItem("isLoggedIn")) {
            props.history.push("/login");
        } else {
            ShopService.addToCart(perfume)
                .then((response) => {
                    props.history.push("/cart");
                });
        }
    }

    return (
        <div>
            <div className="container mt-5 pb-5">
                <div className="row fluid">
                    <div className="col-md-5 fluid__image-container">
                      
                        <ReactImageMagnify {...{
                            smallImage: {
                                alt: 'Wristwatch by Ted Baker London',
                                isFluidWidth: true,
                                src: IMG_URL + `${perfume.filename}`
                            },
                            largeImage: {
                                src: IMG_URL + `${perfume.filename}`,
                                width: 1500,
                                height: 1800
                            }
                        }} />



                        <div className="row">
                        <h3> Product Description</h3>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        </div>
                    </div>
                    <div className=" fluid__instructions">
                        <h2>{perfume.perfumeTitle}</h2>
                        <h3>{perfume.perfumer}</h3>
                        <p>Product Id: <span>{perfume.id}</span></p>
                        <p style={{color: "#54C0A1"}}>Are available</p>
                        <div className="row ml-1">
                            <h6 className="mr-5"><span>{perfume.price}</span>,00 грн.</h6>
                            <button type="submit"
                                    className="btn btn-dark mx-3"
                                    onClick={addToCart}>Add to Cart
                            </button>
                        </div>
                        <br/>
                        <table className="table">
                            <tbody>
                            <tr>
                                <td>Perfume name:</td>
                                <td>{perfume.perfumeTitle}</td>
                            </tr>
                            <tr>
                                <td>Perfumer:</td>
                                <td>{perfume.perfumer}</td>
                            </tr>
                            <tr>
                                <td>A type:</td>
                                <td>{perfume.type}</td>
                            </tr>
                            <tr>
                                <td>Year of issue:</td>
                                <td>{perfume.year}</td>
                            </tr>
                            <tr>
                                <td>Volume:</td>
                                <td><span>{perfume.volume}</span> мл.</td>
                            </tr>
                            <tr>
                                <td>Manufacturer country:</td>
                                <td>{perfume.country}</td>
                            </tr>
                            <tr>
                                <td>Floor:</td>
                                <td>{perfume.perfumeGender}</td>
                            </tr>
                            <tr>
                                <td>Top notes:</td>
                                <td>{perfume.fragranceTopNotes}</td>
                            </tr>
                            <tr>
                                <td>Middle notes:</td>
                                <td>{perfume.fragranceMiddleNotes}</td>
                            </tr>
                            <tr>
                                <td>Base notes:</td>
                                <td>{perfume.fragranceBaseNotes}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;