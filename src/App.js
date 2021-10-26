import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { About } from "./components/About";
import { Home } from "./components/Home";
import Notestate from "./context/notes/NoteState";
import Alert from "./components/Alert";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
function App() {
  const [alert, setalert] = useState(null);
  const showAlert =(message,type)=>
  {
    setalert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setalert(null);
    }, 2000);

  }
  return (
    <>
    <Notestate>
      <Router>
      <Navbar />
      <Alert alert={alert}/>
      <div className="container">
          <Switch>
            <Route exact path="/">
              <Home showAlert={showAlert}/>
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/login">
              <Login showAlert={showAlert}/>
            </Route>
            <Route exact path="/signup">
              <Signup showAlert={showAlert}/>
            </Route>
          </Switch>
          </div>
      </Router>
      </Notestate>
    </>
  );
}

export default App;
