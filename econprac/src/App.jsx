import { useState} from "react";
import ProductList from "./ProductList";
import Cart from "./Cart";
import "./App.css";

function App(){
  const [cart, setCart] = useState([]);
  const[cartError, setCartError] = useState("");

  return (
    <div className="App">
      <header className="app-header">
        <h1>My Trial Store</h1>
      </header>
      <ProductList cart={cart} setCart={setCart} setCartError={setCartError} />
      <Cart cart={cart} setCart={setCart} cartError={cartError} setCartError={setCartError} />
    </div>
  )

}
export default App;