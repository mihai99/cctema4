import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
// import Login from "./components/Login";
import useToken from "./utils/useToken";
import UniqueBoard from "./components/UniqueBoard";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "./utils/authConfig";
import Navbar from "./components/Navbar";

function App() {
 const { instance } = useMsal()

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch(e => console.log(e))
  }

  return (
    <div className="wrapper" style={{ height: "100%" }}>

      <AuthenticatedTemplate>
      <Navbar />
        <BrowserRouter>
          <Switch>
            <Route path="/board/:id">
              <UniqueBoard />
            </Route>
            <Route path="/">
              <Dashboard />
            </Route>
            {/* <Route path="/preferences">
              <Preferences />
            </Route> */}
          </Switch>
        </BrowserRouter>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <h4>Please log in</h4>
        <button onClick={() => handleLogin()}>Log in</button>
      </UnauthenticatedTemplate>
    </div>
  );
}

export default App;
