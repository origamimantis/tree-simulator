import React from 'react'

import { createRoot } from 'react-dom/client'

import "./bootstrap/bootstrap.min.css"
import "./index.css"


import App from './components/App/App.js'


function Rooter()
{
  return (
    <App />
  );
}

const rootElement = document.getElementById("root");

const root = createRoot(rootElement);
root.render(<Rooter callback={() => console.log("renderered")} />);
