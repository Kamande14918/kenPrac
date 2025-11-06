import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart })  =>{
   return (
 <div className="card">
    <img src={product.image} alt={product.title} className="card-img" />
    <h3>{product.title}</h3>
    <p>Ksh{product.price * 100}</p>
    <p>{product.description}</p>
    <button onClick={() => onAddToCart(product)}>Add to Cart</button>
 </div>
   )
}
export default ProductCard;
