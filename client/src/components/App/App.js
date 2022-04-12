import React, {useState} from 'react'

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import Login, {getToken} from '../Login/Login'
import Home from '../Home/Home'
import Other from '../Other/Other'
import Profile from '../Profile/Profile'
import Search from '../Search/Search'
import Register from '../Register/Register'
import NotFound from '../NotFound/NotFound'
import {CanvasContainer} from '../TreeScene/TreeScene'

import Topbar from './Topbar'
import User from '../User/User'


export default function App() {

    //React.useEffect(() => {
    //  let A = async () =>
    //  {
//	let res = await fetch("/test")
//	let m = await res.json()
//	console.log(m)
  //    }
    //  A();
  //}, []);
  
  const loginInfo = useState(null);
  const [loggedIn, setLoginStatus] = loginInfo;

  const loginMsgState = useState("");
  const [loginMsg, setLoginMsg] = loginMsgState;
  
  const stateInfo = useState({});
  const [states, setStates] = stateInfo;
  const getState = (s) => {if (s === undefined) {return states} else {return states[s]}}
  const setState = (s,v) => {states[s] = v}

  states["login"] = loginInfo
  states["loginMsg"] = loginMsgState

  // first time opening
  if (loggedIn === null)
  {
    const token = getToken()
    if (!token)
      setLoginStatus(false)
    else
      setLoginStatus(true)
  }

  return (

    <BrowserRouter>
      <Topbar getState={getState} setState={setState}/>
      <div className="contents">
      <Routes>
	<Route exact path="/" element={<Home getState={getState} setState={setState}/>} />
	<Route path="/home" element={<Navigate replace to="/"/>} />
	<Route path="/profile" element={<Profile getState={getState} setState={setState}/>} />
	<Route path="/login" element={<Login getState={getState} setState={setState}/>} />
	<Route path="/register" element={<Register getState={getState} setState={setState}/>} />
	<Route path="/search" element={<Search getState={getState} setState={setState}/>} />
	<Route path="/bad" element={<Other/>} />
	<Route path="/user/:username" element={<User/>} />
	<Route path="/trees" element={<CanvasContainer/>} />
	<Route path="/*" element={<NotFound/>} />
      </Routes>
      </div>
    </BrowserRouter>
  )
}
