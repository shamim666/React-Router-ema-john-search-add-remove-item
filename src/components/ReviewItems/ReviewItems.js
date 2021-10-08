import React from 'react';

const ReviewItems = (props) => {
    const {name , quantity , price , key} = props.product
    const {handleRemove} = props
    return (
        <div className="product">
            <div>
            <h2 className="product-name">{name}</h2>
            <p >{quantity}</p>
            <p >{price}</p>
            <button onClick={()=>handleRemove(key)} className="btn-regular">Remove</button>
            </div>
            
        </div>
    );
};

export default ReviewItems;