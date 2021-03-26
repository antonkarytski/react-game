import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import App from "./App"

const routedApp = <BrowserRouter><App /></BrowserRouter>
ReactDOM.render(
  <React.StrictMode>
      {routedApp}
  </React.StrictMode>,
  document.getElementById('root')
);

