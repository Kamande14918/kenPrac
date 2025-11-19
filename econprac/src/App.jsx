import { useState, useEffect } from "react";
import Products from "./pages/Products";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { getCurrentUser, logoutUser } from "./utils/localStorageHelpers";

function App(){
  const [currentUser, setCurrentUser] = useState(() =>
  getCurrentUser());

  useEffect(() => {
    const handler = () => setCurrentUser(getCurrentUser());
    window.addEventListener('storage',handler);
    return () => window.removeEventListener('storage',handler);
  },[]);

  const handleAuthChange = (user) => {
    setCurrentUser(user || getCurrentUser());
  }
  const handleLogout = () =>{
    logoutUser();
    setCurrentUser(null);
  }
  return(
    <div className="App">
      <header style={{display:'flex',gap:12, alignItems:'center'}}>
        <Register onAuth={handleAuthChange} />
        <Login onAuth={handleAuthChange} />
        {currentUser ? (
          <div style={{marginLeft:'auto'}}>
            <span>{currentUser.name}</span>
            <button onClick={handleLogout} style={{marginLeft:8}}>Logout</button>
          </div>
        ): null }
      </header>
      <Products currentUser={currentUser} />
    </div>
  )

}
export default App;