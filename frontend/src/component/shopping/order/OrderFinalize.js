import React, {useEffect, useState} from 'react';
import ShopService from "../../../services/ShopService";

function OrderFinalize(props) {
    const [orderIndex, setOrderIndex] = useState("");

    useEffect(() => {
        ShopService.finalizeOrder()
            .then((response) => {
                setOrderIndex(response.data)
            })

    },[])

    return (
        <div className="container text-center mt-5">
            <h2>thank you for the order!</h2>
            <p>Your order number: <span>{orderIndex}</span></p>
        </div>
    );
}

export default OrderFinalize;