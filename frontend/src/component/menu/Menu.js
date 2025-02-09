import React, {useEffect, useState} from "react";
import {gender, perfumer, price} from "./MenuData";
import {Route} from "react-router-dom";
import Checkbox from "./sections/Checkbox";
import ShopService from "../../services/ShopService";
import "./MenuStyle.css";
import RadioCheckbox from "./sections/RadioCheckbox";
import MenuCards from "./sections/MenuCards";

function Menu(props) {
    const [allProducts, setAll] = useState(props.location.state.id)
    const [products, setProducts] = useState([])
    const [Filters, setFilters] = useState({
        perfumers: [],
        genders: [],
        prices: []
    })

    useEffect(() => {
        if (allProducts === "Female" || allProducts === "Male") {
            window.scrollTo(0, 0);
            ShopService.findPerfumeByGender({perfumeGender: props.location.state.id})
                .then((response) => {
                    setProducts(response.data)
                })
        } else if (allProducts === "all") {
            window.scrollTo(0, 0);
            ShopService.getPerfumes()
                .then((response) => {
                    setProducts(response.data)
                })
        } else {
            window.scrollTo(0, 0);
            ShopService.findPerfumeByPerfumer({perfumer: props.location.state.id})
                .then((response) => {
                    setProducts(response.data)
                })
        }
    }, [])

    const getProducts = (variables) => {
        ShopService.getPerfumeByFilterParams(variables)
            .then((response) => {
                setProducts(response.data)
            })
    }

    const handlePrice = (value) => {
        const data = price;
        let array = [];

        for (let key in data) {
            if (data[key].id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }

        return array
    }

    const handleFilters = (filters, category) => {
        const newFilters = {...Filters}
        newFilters[category] = filters

        if (category === "prices") {
            let priceValues = handlePrice(filters)
            newFilters[category] = priceValues
        }

        getProducts(newFilters)
        setFilters(newFilters)
    }

    return (
        <div className="container d-flex">
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>Perfumery</h3>
                </div>
                <ul className="list-unstyled components">

                    <h5>Brand name</h5>
                    <li className="active mb-2" id="homeSubmenu">
                        <Checkbox list={perfumer}
                                  handleFilters={(filters) => handleFilters(filters, "perfumers")}/>
                    </li>

                    <h5>Floor</h5>
                    <li className="active mb-2">
                        <Checkbox list={gender}
                                  handleFilters={(filters) => handleFilters(filters, "genders")}/>
                    </li>

                    <h5>Price</h5>
                    <li className="active mb-2">
                        <RadioCheckbox list={price}
                                       handleFilters={(filters) => handleFilters(filters, "prices")}/>
                    </li>
                </ul>
            </nav>

            <Route exact component={() => <MenuCards data={products} itemsPerPage={16} searchByData={[
                {label: 'Perfumer', value: 'perfumer'},
                {label: 'perfume Title', value: 'perfumeTitle'},
                {label: 'Country', value: 'country'}]}/>}
            />
        </div>
    )
}

export default Menu