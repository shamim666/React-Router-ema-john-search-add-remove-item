import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const { cart } = props;
    console.log(cart);

    // const totalReducer = (previous, product) => previous + product.price;
    // const total = cart.reduce(totalReducer, 0);
    let totalQuantity = 0;
    let total = 0;
    for (const product of cart) {
        
        // if (!product.quantity) {
        //     product.quantity = 1;
        // }
        total = total + product.price * product.quantity;
        totalQuantity = totalQuantity + product.quantity;
    }

    const shipping = total > 0 ? 15 : 0;
    const tax = (total + shipping) * 0.10;
    const grandTotal = total + shipping + tax;
    return (
        <div>
            <h3>Order Summary</h3>
            <h5>Items Ordered: {totalQuantity}</h5>
            <br />
            <p>Total: {total.toFixed(2)}</p>
            <p>Shipping: {shipping}</p>
            <p>tax: {tax.toFixed(2)}</p>
            <p>Grand Total: {grandTotal.toFixed(2)}</p>
            {/* sometimes you need to use same component in different pages . here cart component is used
            in shop and OrderReview page. but in shop page cart component will contain order review button
            and in OrderReview page cart component will contain place order button . So in this case 
            we have to use props.children in cart component and what we want to show in UI like button , 
            text or anything have to included into the pater vetor of component <Component><button></Coomponent> */}
            {props.children}
        </div>
    );
};

export default Cart;