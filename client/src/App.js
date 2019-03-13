import React from "react";
import "./global.css";
import axios from "axios";
import {
  //import BrowserRouter and Route
  BrowserRouter,
  Route,
  Switch
} from "react-router-dom";


//import Components
import Header from "./components/Header";
import Courses from "./components/courseAction/Courses";
import CourseDetail from "./components/courseAction/CourseDetail";
import UserSignIn from "./components/userAction/UserSignIn";
import UserSignUp from "./components/userAction/UserSignUp";
import CreateCourse from "./components/userAction/CreateCourse";
import UpdateCourse from "./components/userAction/UpdateCourse";
import UserSignOut from "./components/userAction/UserSignOut";


export default class App extends React.Component {
  //Class components need to extend  React.Component, and class components require the render()
  constructor() {
    //state for data we want to display from api
    super();
    this.state = {
      //set initial state to a empty array called courses
      courses: []
    };
  }

  componentDidMount() {
    //fetch data from API
    axios.get("http://localhost:5000/api/courses").then(results => {
      //  console.log(results), this lets me know that I was able to grab my api data
      this.setState({
        courses: results.data
      });
    });
  }

  render() {
    return (
      //JSX inside
      <BrowserRouter>
        <div>
          <Header title="Sign Up For Courses" />
          <Switch>
            <Route exact path="/" component={Courses} />
            <Route exact path="/courses/create" component={CreateCourse} />
            <Route exact path="/courses/:id/update" component={UpdateCourse} />
            <Route exact path="/courses/:id" component={CourseDetail} />
            <Route exact path="/signin" component={UserSignIn} />
            <Route exact path="/signup" component={UserSignUp} />
            <Route exact path="/signout" component={UserSignOut} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

