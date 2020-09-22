import React, { useEffect, useState } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import ProjectList from "./components/ProjectList";
import AddProject from "./components/AddProject";

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

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .get("/api/projects", {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        })
        .then((res) => setProjects([...projects, ...res.data]))
        .catch((err) => console.log(err));
    }
  }, []);
  return (
    <>
      <Router>
        <Header isAuth={isAuth} setIsAuth={setIsAuth}></Header>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route
            path="/"
            exact
            render={() => (
              <ProjectList projects={projects} setProjects={setProjects} />
            )}
          />

          <Route
            path="/add_project"
            exact
            render={() => (
              <AddProject projects={projects} setProjects={setProjects} />
            )}
          />
        </Switch>
      </Router>
    </>
  );
}

export default App;
