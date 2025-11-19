import { useEffect, useState, useReducer, useCallback } from "react";
import ProductCard from "../components/ProductCard";
import Cart from "./Cart";
import {getUserCart, setUserCart} from "../utils/localStorageHelpers";
import { cartReducer, initialCartState, ACTIONS } from "../reducers/cartReducer";

function Products({currentUser}){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [authError, setAuthError] = useState(null);
    const apiUrl = "https://fakestoreapi.com/products";

    // use a reducer to manage cart state (pure and testable)
    const [state, dispatch] = useReducer(cartReducer, initialCartState);

    useEffect(() => {
        const fetchProducts = async () => {
            try{
                const res = await fetch(apiUrl);
                const data = await res.json();
                setProducts(data);
                setLoading(false);
            } catch(err){
                setError("Failed to fetch products.");
                setLoading(false);
                console.error(err);
            };
        }
        fetchProducts();
    },[apiUrl])
    // reducer keeps `state.total` up-to-date. We persist below when state.cart changes.

    // load persisted cart when currentUser changes
    useEffect(() => {
        if (currentUser && currentUser.id){
                const saved = getUserCart(currentUser.id) || [];
                dispatch({ type: ACTIONS.SET_CART, payload: saved });
        } else {
                // clear cart when no user 
                dispatch({ type: ACTIONS.CLEAR_CART });
        }
    },[currentUser]);
     const handleAddToCart = useCallback((product) => {
        if(!currentUser){
            setAuthError("Please log in to add items to your cart.");
            return;
        }
        setAuthError(null);
        dispatch({ type: ACTIONS.ADD_TO_CART, payload: product });
     }, [currentUser]);

     // persist cart to localStorage when cart or currentUSer changes
        useEffect(() => {
            if(currentUser && currentUser.id){
                setUserCart(currentUser.id, state.cart)
            }
        },[state.cart, currentUser]);

    const handleRemoveFromCart = useCallback((cartId) =>{
        dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: { cartId } });
    }, []);

    const handleUpdateQuantity = useCallback((cartId, newQuantity) =>{
        dispatch({ type: ACTIONS.UPDATE_QUANTITY, payload: { cartId, quantity: newQuantity } });
    }, []);
    if(loading) return <p>Loading products...</p>

    return (
        <div className="products-page">
            <h2>Products</h2>
            {error && <p style={{color: 'red'}}>{error}</p>}
            {authError && <p>{authError}</p>}
            <Cart cart={state.cart} total={state.total * 100} onRemoveFromCart={handleRemoveFromCart} onUpdateQuantity= {handleUpdateQuantity} />
            <ul className="products-list">
                {products.map(product => (
                    <ProductCard key={product.id} product= {product} onAddToCart={handleAddToCart} />
                ))}
            </ul>
        </div>
    )
}


export default Products;