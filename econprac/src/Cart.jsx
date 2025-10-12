import { useState, useEffect} from "react";


function Cart({cart, setCart, cartError, setCartError}){
    const [isCartOpen, setIsCartOpen] = useState(false);
    
    // Calculate cart totals;
    const calculateSubtotal = () =>{
        return cart.reduce((total, item) =>
            total + (item.price * item.quantity)
        ,0);
    }
    const calculateTax = (subTotal) =>{
        return subTotal * 0.08; //8% tax rate
    }

    const calculateTotal = () =>{
        const subTotal = calculateSubtotal();
        const tax = calculateTax(subTotal);
        return subTotal + tax 
    }
    const getTotalItems = () =>{
        return cart.reduce((total, item) =>
         total + item.quantity,0);
    }
    // Cart operations
    const updateQuantity = (id, newQuantity) => {
        if(newQuantity <= 0){
            removeFromCart(id);
            return;
        }
        setCart(cart.map(item =>
            item.id === id
            ? {...item, quantity: newQuantity}
            : item

        ));
    };
    const removeFromCart = (id) =>{
        setCart(cart.filter(item => item.id !==id));
        setCartError("");
    }
    const clearCart = () =>{
        setCart([]);
        setCartError("");

    }
    // Auto-close cart after every 3 seconds
    useEffect(() =>{
        if(cartError){
            const timer = setTimeout(() => {
                setCartError("");
            },3000);
            return () => clearTimeout(timer);
        }
    },[cartError, setCartError])

    return(
        <div className="cart-container">
         {/*Cart toggle button  */}
         <button 
            className="cart-toggle"
            onClick={() => setIsCartOpen(!isCartOpen)}
            aria-label="Toggle Cart"
            >
                🛒 Cart ({getTotalItems()})
            </button>
            {/* Cart sidebar */}
            <div className={`cart-sidebar ${isCartOpen ? "open": ""}`}>
                <div className="cart-header">
                    <h2>Shopping Cart</h2>
                    <button className="close-cart" onClick={() => setIsCartOpen(false)}
                    aria-label="Close Cart"
                    >❌</button>
                </div>

                {/* Cart error display */}
                {cartError && ( <div className="cart-error">
                    <div className="cart-error">
                        {cartError}
                    </div>
                </div>
                )}

                {/* Cart Items */}
               <div className="cart-items">
                {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                ):(
                    cart.map(item =>(
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h4 className="cart-item-name">{item.name}</h4>
                                <p className="cart-item-price">${item.price.toFixed(2)}</p>
                         </div>
                         <div className="quantity-controls">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity -1)}
                              className="quantity-btn"  
                              aria-label="Decrease quantity"
                              >
                                -
                              </button>
                              <span className="quantity">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity +1)}
                                className="quantity-btn"
                                aria-label="Increase quantity"
                                >
                                    +
                                </button>
                                </div>
                                <p className="item-total">
                                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                                </p>
                                </div>
                                
                    ))
                )}
               </div>
            </div>
        </div>
    )

}

export default Cart;