import {useState} from 'react';
import {loginUser, setCurrentUser} from "../utils/localStorageHelpers";

function Login(props){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");


    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const user = await loginUser(email, password);
            // set as current user in  localStorage
            setCurrentUser(user);
            setTimeout(() => {
                setMessage(`User ${user.name} logged in successfully`);
            },1000);
            if(typeof props?.onAuth === 'function') props.onAuth(user);

        } catch(error){
            setMessage(error.message)
        }
    }
    return (
        <div className="login-page">
            <form onSubmit = {handleSubmit}>
                <h2>Login</h2>
                {message && <p>{message}</p>}
                <label htmlFor="email">Email:</label>
                <input type="email"  value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}  required />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
export default Login;