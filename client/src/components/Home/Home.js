import React from 'react';
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom"


import Login, {getToken, delToken} from "../Login/Login"

export default function Home({getState,setState}) {

  const [loggedIn, setLoginStatus] = getState("login");

  return (
    <>
    <p/>
    <h3>Tree Simulator</h3>
    {(() =>{
      if (loggedIn)
      {
	const username = localStorage.getItem('username')
	if (username === null)
	{
	  delToken()
	  setLoginStatus(false);
	}

	return (
	  <p>welcome, {username}</p>
	)
      }
      else
      {
	return (
	  <>
	  one two tree<br/>
	  login for tree
	  </>
	)
      }
    })()}
    </>
  );

}
