import { useState} from "react";
import {registerUser, setCurrentUser} from "../utils/localStorageHelpers";

function Register(props){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const user = await registerUser(name, email, password);
            // auto-login after register
            setCurrentUser(user);
            setTimeout(() => {
                setMessage(`User ${user.name} registered successfully`);

            }, 1000);
            if(typeof props?.onAuth === 'function') props.onAuth(user);
        } catch(error){
            setMessage(error.message);
        }
    }
    return(
        <div className="register-page">
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                {message && <p>{message}</p>}
                <label htmlFor="name">Name:</label>
                <input type="text" className="input-field" value={name} onChange={(e) => setName(e.target.value)} required />
                <label htmlFor="email">Email:</label>
                <input type="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label htmlFor="password">Password:</label>
                <input type="password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register;