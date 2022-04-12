import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom"


async function createUser(credentials)
{
  let res = await fetch("/api/register",
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

export default function Register({getState, setState, state})
{
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const [err, setErr] = useState("");
  const [loginerr, setLoginErr] = getState("loginMsg");

  let nav = useNavigate()

  const handleSubmit = async (e) => 
    {
      e.preventDefault();

      if (username.length == 0)
	setErr("username can't be blank")
      else if (password.length == 0)
	setErr("password can't be blank")


      // username and password are valid, try to create account
      else
      {
	const result = await createUser({
	  username,
	  password
	});
	if (result.result == "OK")
	{
	  nav("/login")
	  setLoginErr("Registration successful")
	}
	else
	{
	  setErr("registration failed")
	}
      }
    }

  return(
    <>
    <p/>
    <div className="register-wrapper">
      <h3>tree farmer registration</h3>
      <p>please form a single file line</p>
      <form onSubmit = {handleSubmit}>
        <label>
          <p>Set username</p>
          <input type="text"     onChange={e => setUsername(e.target.value)}/>
        </label>
        <label>
          <p>Set password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
	<p>{err}</p>
        <div>
          <button type="submit">Commence sheplantigans</button>
        </div>
      </form>
    </div>
    </>
  )
}
