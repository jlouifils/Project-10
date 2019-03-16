import React from "react";
import "./global.css";
import axios from "axios";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Courses from "./components/courseAction/Courses";
import CourseDetail from "./components/courseAction/CourseDetail";
import UserSignIn from "./components/userAction/UserSignIn";
import UserSignUp from "./components/userAction/UserSignUp";
import CreateCourse from "./components/userAction/CreateCourse";
import UpdateCourse from "./components/userAction/UpdateCourse";
import UserSignOut from "./components/userAction/UserSignOut";


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      courses: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/api/courses").then(results => {
      this.setState({
        courses: results.data
      });
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header title="Sign Up For Courses" />
          <Switch>
            <Route exact path="/" component={Courses} />
            <Route exact path="/courses/create" component={CreateCourse} />
            <Route exact path="/courses/:id/update" component={UpdateCourse} />
            <Route exact path="/courses/:id" component={CourseDetail} />
            <Route exact path="/UserSignIn" component={UserSignIn} />
            <Route exact path="/UserSignUp" component={UserSignUp} />
            <Route exact path="/signout" component={UserSignOut} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

