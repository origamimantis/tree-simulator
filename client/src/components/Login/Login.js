import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate,Link } from "react-router-dom"

async function loginUser(credentials)
{
  let res = await fetch("/api/login",
    {
      method: 'POST',
      headers: 
      {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }
  );
  return await res.json();
}

export function getToken()
{
  const tokenString = localStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
};

export function useToken()
{
  const [token, _setToken] = useState(getToken());

  const saveToken = (userToken) =>
  {
    localStorage.setItem('token', JSON.stringify(userToken));
    _setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token: token,
    loggedOut: !token
  }
}

export function delToken()
{
  localStorage.removeItem("token");
  localStorage.removeItem("username");
}



export default function Login({getState, setState})
{
  const auth = useToken()
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const [loggedIn, setLoginStatus] = getState("login");

  const [err, setErr] = useState("");

  let nav = useNavigate()
  const goBack = ()=>
  {
    let returnPage = sessionStorage.getItem('returnPage')
    if (returnPage === undefined || (returnPage == "/profile" && loggedIn == false) )
      returnPage = "/"
    nav(returnPage)
  }
  const handleSubmit = async (e) => 
    {
      e.preventDefault();
      const token = await loginUser({
	username,
	password
      });
      console.log(token)
      if (token.token === null)
      {
	setErr("login failed")
      }
      else
      {
	auth.setToken(token);
	localStorage.setItem('username', username)

	setLoginStatus(true)

	nav("/profile")
      }
    }

  return(
    <>
    <p/>
    <div className="login-wrapper">
      <h3>login screen</h3>
      <form onSubmit = {handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text"     onChange={e => setUsername(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
	<p>{err}</p>
        <div>
          <button type="submit">Tree time!</button>
        </div>
        <div>
          <Link to="/register">Create an account</Link>
        </div>
      </form>
    </div>
    </>
  )
}

Login.propTypes = {
  getState: PropTypes.func.isRequired,
  setState: PropTypes.func.isRequired,
}
