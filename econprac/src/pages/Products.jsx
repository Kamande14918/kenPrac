import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Cart from "./Cart";
import './Product.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = "https://fakestoreapi.com/products";

    // cart state lifted here so Products renders both Cart and ProductCard
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(apiUrl);
                const data = await res.json();
                setProducts(data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch products.");
                setLoading(false);
                console.error(err);
            }
        };
        fetchProducts();
    }, [apiUrl]);

    useEffect(() => {
        const t = cart.reduce((acc, item) => acc + (item.price * item.quantity * 100), 0);
        setTotal(t);
    }, [cart]);

    const handleAddToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { cartId: Date.now(), ...product, quantity: 1 }];
        });
    };

    const handleRemoveFromCart = (cartId) => {
        setCart(prev => prev.filter(item => item.cartId !== cartId));
    };

    const handleUpdateQuantity = (cartId, newQuantity) => {
        setCart(prev => prev.map(item => item.cartId === cartId ? { ...item, quantity: newQuantity } : item).filter(i => i.quantity > 0));
    };

    if (loading) return <div>Loading products...</div>;

    return (
        <div className="products-page">
            {/* Cart receives cart state and handlers via props */}
            <Cart cart={cart} total={total} onRemoveFromCart={handleRemoveFromCart} onUpdateQuantity={handleUpdateQuantity} />
            <h1>Products</h1>
            {error && <div className="error">{error}</div>}
            <div className="products-grid">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                ))}
            </div>
        </div>
    );
};

export default Products;