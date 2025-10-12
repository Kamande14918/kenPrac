import { useState, useEffect} from "react";
// import "./ProductList.css";

function ProductList({cart, setCart, setCartError}){
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const url = "https://fakestoreapi.com/products";

    const handleAddToCart = (id) =>{
        const productToAdd = products.find((product) =>{
            return product.id === id;
        });
        if(productToAdd){
            // Check if item already exists in cart 
            const existingItem = cart.find((item) => item.id === id);
            if(existingItem){
                // Update quantity if item exists
                setCart(cart.map((item) =>
                    item.id === id ?{...item, quantity: item.quantity + 1} : item));
            } else {
                // Add new item with quantity 1
                setCart([...cart, {...productToAdd, quantity: 1}]);
            }
            setCartError(""); //Clear any cart errors
        }
    }
   useEffect(() => {
        async function fetchProducts(){
            setIsLoading(true);
            try{
                const resp = await fetch(url);
                if(!resp.ok){
                    throw new Error(resp.statusText);
                }
                const data = await resp.json();
                if(!data){
                    throw new Error(data.message);
                }
                setProducts(data);
                setIsLoading(false);
            } catch(error){
                setError(error.message);
                setIsLoading(false);
            }
        }
        fetchProducts();
   },[url]);

   return(
    <div className="product-list">
        {isLoading && <div>Loading...</div>}
        {error && <p>{error}</p>}
        {products && products.map((product) =>{
            <ul className="product" key={product.id}>
                <img src ={product.imag} alt={product.title}
                width="100%" />
                <li key={product.id}>{product.title}</li>
                <li>{product.category}</li>
                <li>ksh {product.price * 100}</li>
                <li>{product.description}</li>
                <li>{product.rating.rate}</li>
                <button className="add-to-cart" onClick={() => handleAddToCart(product.id)}>
                    Add to Cart
                </button>
            </ul>
        })}
    </div>
   )
}
export default ProductList;
