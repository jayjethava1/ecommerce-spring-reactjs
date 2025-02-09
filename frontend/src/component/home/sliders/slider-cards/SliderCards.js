import React, {useEffect, useState} from 'react';
import Carousel from "react-bootstrap/Carousel";
import {Link} from "react-router-dom";
import ShopService from "../../../../services/ShopService";
import "./SliderCards.css";
import {IMG_URL} from "../../../../constants";

const perfumesId = [39, 56, 119, 59, 47, 95, 89, 98, 52, 40, 92, 99];

function SliderCards(props) {
    const [perfumes, setPerfumes] = useState([]);

    useEffect(() => {
        ShopService.getPerfumes()
            .then((response) => {
                setPerfumes(response.data)
            });
    }, [])

    const addCarouselItems = (array, counter) => {
        return (
            <Carousel.Item>
                <div className="card-deck">
                    {array.map((perfume) => {
                        for (let i = counter; i < counter + 4; i++) {
                            if (perfume.id === perfumesId[i]) {
                                return (
                                    <div className="card">
                                        <img className="d-block mx-auto w-50"
                                             src={IMG_URL + `${perfume.filename}`}/>
                                        <div className="card-body text-center">
                                            <h5>{perfume.perfumeTitle}</h5>
                                            <h6>{perfume.perfumer}</h6>
                                            <h6><span>{perfume.price}</span>,00 грн.</h6>
                                            <Link to={`/product/${perfume.id}`}>
                                                <span className="btn btn-dark">
                                                Buy
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            }
                        }
                    })}
                </div>
            </Carousel.Item>
        );
    }

    const settings = {
        controls: false
    }

    return (
        <div>
            <div className="container text-center my-3" style={{width: "200px"}}>
                <h4>New items</h4>
            </div>

            <div className="container mt-5" id="indicators">
                <form method="get" action="/">
                    <Carousel {...settings}>
                        {addCarouselItems(perfumes, 0)}
                        {addCarouselItems(perfumes, 4)}
                        {addCarouselItems(perfumes, 8)}
                    </Carousel>
                </form>
            </div>
        </div>
    );
}

export default SliderCards;