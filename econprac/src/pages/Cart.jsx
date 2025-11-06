import React,{useState, useEffect} from "react";

export default function Cart({ cart, onUpdateQuantity, onRemoveItem}){
    const [total, setTotal] = useState(0);

         const calculateTotal = () =>{
        let newTotal = 0;
        cart.forEach(item => {
            newTotal += item.price * item.quantity * 100;

        });
        setTotal(newTotal);
       }
         useEffect(() =>{
            calculateTotal();
         },[cart]);
     return (
    <div className="cart-page">
        <h1>Shopping Cart</h1>
        {cart.length === 0 ?(
            <p>Your cart is empty</p>
        ):
        (
            <ul className="cart-items">
                {cart.map(item =>(
                    <li key={item.cartId} className="cart-item">
                        <img src={item.img} alt={item.title} className="cart-item-img" />
                        <h4>{item.title}</h4>
                        <p>Ksh {item.price * 100}</p>
                        <div className="quantity-controls">
                            <button onClick={() =>
                                onUpdateQuantity(item.id,
                                    item.quantity -1
                                )
                            }>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() =>
                                onUpdateQuantity(item.id,
                                    item.quantity + 1
                                )
                            }>+ </button>
                            <button onClick={() => onRemoveItem(item.id=== null)}>Remove❌</button>
                             </div>
                            <p>Subtotal: Ksh {(item.price * item.quantity * 100).toFixed(2)}</p>
                    </li>    
                ))}
                <hr />
                <li className="cart-total">
                    <h3>Total: Ksh {total.toFixed(2)}</h3>
                </li>
            </ul>
        )}
    </div>
   )
    
}