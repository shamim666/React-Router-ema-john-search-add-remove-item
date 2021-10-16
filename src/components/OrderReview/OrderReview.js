import React from 'react';
import { useHistory } from 'react-router';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';
import { clearTheCart, removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItems from '../ReviewItems/ReviewItems';


//OrderReview Page shows the added products of cart and  cart itself 
const OrderReview = () => {

    // useProducts() and useCart() is a custom hook function and its definition is in hooks
    // here useProducts() returns a array inside array  come from useProducts function which returns [products] 
    // and products is a array and it is wrapped by [] . so it is now array inside array . 
    // [products] = [products] -- [products] = [ [{...} , {...} , {...},...] ]--
    // so products = [{...} , {...} , {...},...] -total 81 object elements existed in products array .
    // thats why products.length = 81

    
    const [products] = useProducts();
    const [cart, setCart] = useCart(products);
    // Remove theory: filter those products which are not selected by remove button 
    const handleRemove = key => {
        const newCart = cart.filter(product => product.key !== key)
        setCart(newCart)
        removeFromDb(key);
    }

// here useHistory is used to go to placeorder page by onClick eventhandler of Place Order button. 
// Place Order button is a children of Cart component. 
// handlePlaceOrder eventHandler is  used to clear the cart and local storage after placing order.
// In future when a user clicks this button it will take user to a place order page and also remove items from 
// cart and database.
    const history = useHistory();
    const handlePlaceOrder = () => {
        history.push('/placeorder')
        // clear the cart
        setCart([]);
        // clear the local storage
        clearTheCart();  

    }
    return (
        <div className="shop-container">
            {/* showing added products of cart  */}
            <div className="product-container">
                {cart.map(product => <ReviewItems product={product}
                    key={product.key}
                    handleRemove={handleRemove}></ReviewItems>)}

            </div>

            {/* showing cart */}
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder}className="btn-regular">Place Order</button>
                </Cart>
            </div>

        </div>
    );
};

export default OrderReview;