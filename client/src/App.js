import React, { useEffect, useState } from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import { ProtectedRoute, GuestRoute } from "./components/Route";
import axios from "axios";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import ProjectList from "./components/ProjectList";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .get("/api/user", {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        })
        .then((res) => setUser(res.data))
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("token");
        });
    }
  }, [projects]);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);
  return (
    <>
      <Router>
        <Header isAuth={isAuth} setIsAuth={setIsAuth}></Header>
        <Switch>
          <GuestRoute path="/login" exact component={Login} />
          <GuestRoute path="/register" exact component={Register} />
          <ProtectedRoute path="/" exact component={ProjectList} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
