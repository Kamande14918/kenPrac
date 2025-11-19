export default function Cart({ cart = [], total = 0, onRemoveFromCart, onUpdateQuantity}){
    return(
   <div className="cart-page">
        <h1>Shopping Cart</h1>
        {cart.length === 0 ? (
            <p>Your cart is empty</p>
        ):(
            <ul  className="cart-items">
                {cart.map( item => (
                    <li key={item.cartId}>
                        <img src={item.image} alt={item.title} />
                        <h4>{item.title}</h4>
                        <p>Ksh {(item.price * 100).toFixed(2)}</p>
                        <div className="quantity-controls">
                            <button onClick={() =>
                                onUpdateQuantity(item.cartId,
                                    item.quantity -1
                                )
                            }>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() =>
                                onUpdateQuantity(item.cartId,item.quantity + 1)
                            }>+</button>
                            <button onClick={() => onRemoveFromCart(item.cartId)}>Remove ❌</button>
                        </div>
                        <p>Subtotal: Ksh {(item.price * item.quantity * 100).toFixed(2)}</p>
                        <hr />
                        <div className="cart-total">
                            <h3>Total: Ksh {total.toFixed(2)}</h3>
                        </div>
                    </li>
                ))}
            </ul>
        )}
   </div>
    )
}
