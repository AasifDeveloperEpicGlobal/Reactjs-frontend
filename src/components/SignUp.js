import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const SingUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const navigate = useNavigate();
    const [error, setError] = React.useState(false);

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    }, []);

    const collectData = async () => {
        console.log(name, email, password, mobile);
        if (!name || !email || !password || !mobile) {
            setError(true);
            return false;
        }

        let result = await fetch('http://localhost:5000/register', {
            method: 'post',
            body: JSON.stringify({ name, email, password, mobile}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.log(result);
        localStorage.setItem('user', JSON.stringify(result.result))
        localStorage.setItem('token', JSON.stringify(result.auth))
        navigate('/');
    }

    return (
        <div className="register">
            <h1>Register</h1>
            <input className="inputBox" type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="Enter Name" />
            {error && !name && <span className="fieldError">Enter valid name</span>}
            <input className="inputBox" type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter Email" />
            {error && !email && <span className="fieldError">Enter valid email</span>}
            <input className="inputBox" type="Password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter Password" />
            {error && !password && <span className="fieldError">Enter valid password</span>}
            <input className="inputBox" type="contact" onChange={(e)=> setMobile(e.target.value)} value={mobile} placeholder="Enter Mobile no"  />
            {error && !mobile && <span className="fieldError">Enter valid name</span>}
            <button onClick={collectData} className="registerButton" type="button">Sign Up</button>
        </div>
    );
}
export default SingUp;