import React ,{ useState , useEffect} from "react";
import ProductCard from "../components/ProductCard";
import Cart from "./Cart";
import './Product.css';

const Products = () =>{
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = "https://fakestoreapi.com/products";

    useEffect(() =>{
        const fetchProducts = async () =>{
            try {
                const res = await fetch(apiUrl);
                const data = await res.json();
                setProducts(data);
                setLoading(false);
            } catch (err){
                setError("Failed to fetch products.");
                setLoading(false);
                console.error(err);
            }
        }
        fetchProducts();
    },[apiUrl]);
    
     const handleAddToCart = (product) =>{
        // check if product is already in cart
        const existing = cart.find(item => item.id === product.id);
        if(existing){
            //update quantity
            setCart(cart.map(item => 
                item.id === product.id ? {...item, quantity: item.quantity + 1} : item
            ))
        } else {
            setCart([...cart, {cartId: Date.now(),...product, quantity: 1}]);
        }
     }
     if(loading) return <div>Loading products...</div>

     return (
        <div className="products-page">
            {/* Cart */}
            <Cart cart={cart} />
            <h1>Products</h1>
            {error && <div className="error">{error}</div>}
            <div className="products-grid">
                {products.map(product => (
                    <ProductCard key={product.id} product={product}
                    onAddToCart={handleAddToCart}
                    />    
                ))}
                {/* Test cart */}
                <div className="cart">
                    <h2>Shopping Cart</h2>
                    {cart.length === 0 ?(
                        <p>Your cart is empty</p>
                    ):(
                        <ul>{
                            cart.map(item =>
                                <li key={item.id}>
                                    {item.cartId} -
                                    {item.title} - Quantity:
                                    {item.quantity}
                                </li>
                            )}</ul>
                    )}
                    <p>Total cart items: {cart.length}</p>
                </div>
            </div>
        </div>
     )
}

export default Products;