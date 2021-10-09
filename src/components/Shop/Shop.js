import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import './Shop.css';
import { Link } from 'react-router-dom';

const Shop = () => {

    // products state which is initially empty . this should be changed either useEffect or eventhandler
    const [products, setProducts] = useState([]);
    // cart state which is initially empty . this should be changed either useEffect or eventhandler
    const [cart, setCart] = useState([]);
    // displayProducts is being used for search result
    const [displayProducts, setDisplayProducts] = useState([]);


    // data load by API and change products  and  displayProducts state. 
    // if useEffect has no dependencies that means empty array [] then it will load only once.  
    useEffect(() => {
        fetch('./products.JSON')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setDisplayProducts(data);
            });
    }, []);


    // cart state has been changed by selecting product  or adding product to cart .  
    const handleAddToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        // save to browser local storage (for now) in future in database. 
        addToDb(product.key);
    }


    // here useEffect has dependencies [products] which means if products change useEffect will  load.
    // here useEffect is used to read data from browser local storage and set it to cart by setCart
    useEffect(() => {
        if (products.length) {
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

    // Search result has been done by this onChange event
    const handleSearch = event => {
        const searchText = event.target.value;

        const matchedProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));

        setDisplayProducts(matchedProducts);
    }


    // this section is only for rendering to UI. that means what you want to show in UI
    return (
        <div>
            {/* showing search section */}
            <div className="search-container">
                <input
                    type="text"
                    onChange={handleSearch}
                    placeholder="Search Product" />
            </div>


            <div className="shop-container">

                {/* showing  searched  products and also total products  */}
                <div className="product-container">
                    {
                        displayProducts.map(product => <Product
                            key={product.key}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        >
                        </Product>)
                    }
                </div>

                {/* showing cart             */}
                <div className="cart-container">
                    <Cart cart={cart}>
                        <Link to = "/review" >
                            <button className="btn-regular">Review Products</button>
                        </Link>
                    </Cart>
                </div>
            </div>
        </div>
    );
};

export default Shop;