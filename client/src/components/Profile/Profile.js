import React, {useState} from 'react';
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom"
import PropTypes from 'prop-types';

import Login, {getToken} from "../Login/Login"
import {CanvasContainer} from "../TreeScene/TreeScene"

export default function Profile({getState,setState}) {


  let nav = useNavigate();
  const [loggedIn, setLoginStatus] = getState("login");
  React.useEffect(()=>{
    if(!loggedIn) {
      sessionStorage.setItem('returnPage', window.location.pathname);
      nav("/login");
  }})

  return (
    <>
    <p/>
    <h3>profile page</h3>
    <p>After this is implemented, there will be a tree here.</p>
    <CanvasContainer/>
    </>
  );

}

Profile.propTypes = {
  getState: PropTypes.func.isRequired,
  setState: PropTypes.func.isRequired,
}
