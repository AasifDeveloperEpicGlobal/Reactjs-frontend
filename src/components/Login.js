import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();
    const [error, setError] = React.useState(false);

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
    }, []);

    const handleLogin = async () => {
        console.log(email, password);

        if (!email || !password) {
            setError(true);
            return false;
        }
        let result = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        if (result.auth) {
            // localStorage.setItem('user', JSON.stringify(result))
            localStorage.setItem('user', JSON.stringify(result.user))
            localStorage.setItem('token', JSON.stringify(result.auth))
            navigate('/');
        } else {
            alert("Please enter correct details..");
        }
        console.log(result);
    }
    return (
        <div className="login">
            <h1>Login</h1>
            <input className="inputBox" type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter Email" />
            {error && !email && <span className="fieldError">Enter valid email</span>}
            <input className="inputBox" type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter Password" />
            {error && !password && <span className="fieldError">Enter valid password</span>}
            <button onClick={handleLogin} className="loginButton" type="button">Sign In</button>
        </div>
    );
}
export default Login