import { faKeyboard } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getStoredCart } from "../utilities/fakedb";


// UseCart will pick up the product from bworser local storge which will be database in future 
const useCart = products =>{

const [cart , setCart] = useState([]); 

    useEffect(() => {
        if (products.length) {
            // here getStoredCart() function in faKeyboard.js is used to get info from browser local Storage 
            // which is a object. 
            const savedCart = getStoredCart();
            const storedCart = [];
            for (const key in savedCart) {
                const addedProduct = products.find(product => product.key === key);
                if (addedProduct) {
                    const quantity = savedCart[key];
                    addedProduct.quantity = quantity;
                    storedCart.push(addedProduct);
                }
            }
            setCart(storedCart);
        }
    }, [products])

    return [ cart ,setCart ]

}

export default useCart 