import React from 'react';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';
import { removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItems from '../ReviewItems/ReviewItems';


//OrderReview Page shows the added products of cart and  cart itself 
const OrderReview = () => {

    // here useProducts() returns a array inside array  come from useProducts function which returns [products] 
    // and products is a array and it is wrapped by [] . so it is now array inside array . 
    // [products] = [products] -- [products] = [ [{...} , {...} , {...},...] ]--
    // so products = [{...} , {...} , {...},...] -total 81 object elements existed in products array .
    // thats why products.length = 81

    const [products] = useProducts();
    const [cart , setCart] = useCart(products);
// Remove theory: filter those products which are not selected by remove button 
    const handleRemove = key =>{
        const newCart = cart.filter(product=>product.key !== key )
        setCart(newCart)
        removeFromDb(key);
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
                <Cart cart={cart}></Cart>
            </div>

        </div>
    );
};

export default OrderReview;