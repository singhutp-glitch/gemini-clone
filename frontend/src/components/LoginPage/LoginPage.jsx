import React, { useState } from 'react'
import './LoginPage.css'
import { loginUser } from '../../services/authApi';

const LoginPage = ({setUser}) => {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");

async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (!email.includes("@")) {
    setError("Please enter a valid email");
    return;
    }

    if (password.length < 6) {
    setError("Password must be at least 6 characters long");
    return;
    }

    console.log({
    email,
    password,
    });

    const result = await loginUser(email,password);
    if(!result.ok){
        setError(result.data.error);
        return
    }
    localStorage.setItem('toekn',result.data.token);
    setUser(result.data.user);

}

return ( <div> <h1>Login</h1>

  {error && <p>{error}</p>}

  <form onSubmit={handleSubmit}>
    <label htmlFor="email">Email</label>
    <input
      type="email"
      id="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <label htmlFor="password">Password</label>
    <input
      type="password"
      id="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <button type="submit">
      Login
    </button>
  </form>
</div>

);}

export default LoginPage