import React, {useState} from 'react';
import {Link} from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom"
import PropTypes from 'prop-types';

import Login, {getToken} from "../Login/Login"
import {CanvasContainer} from "../TreeScene/TreeScene"

export default function User({getState,setState}) {

  const [loaded, setLoaded] = useState(false)
  const [userData, setUserData] = useState(null)
  const {username} = useParams();

  async function getUserData(username)
  {
    let res = await fetch("/api/getuser",
      {
        method: 'POST',
        headers:
        {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username:username})
      }
    );
    let result = await res.json();

    setLoaded(true);
    setUserData(result.result);
  }
  if (loaded == false)
    getUserData(username)



  return (
    <>
    <p/>
    {(() =>{
      if (loaded == false)
      {
	return <><p>Loading...</p></>
      }
      else
      {
	return (
	  <>
          <h3>{userData.username}'s page</h3>
	  <p>After this is implemented, there will be a tree here.</p>
	  <CanvasContainer/>
	  </>
	)
      }
    })()}
    </>
  );

}
