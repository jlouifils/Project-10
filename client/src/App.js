import React, { Component } from 'react';
import './global.css';
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//import App Components
import Header from "./components/Header";
import Courses from "./components/courseAction/Courses";
import CourseDetail from "./components/courseAction/CourseDetail";
import CreateCourse from "./components/userAction/CreateCourse";
import UpdateCourse from "./components/userAction/UpdateCourse";
import UserSignIn from "./components/userAction/UserSignIn";
import UserSignOut from "./components/userAction/UserSignOut";
import UserSignUp from "./components/userAction/UserSignUp";



class App extends Component {
  constructor(){
    super();
    this.state ={
      courses: []
    };
  }   
  componentDidMount() {
    axios.get("http://localhost:5000/api/courses")
    .then(results =>{
      this.setState({
        courses: results.data
      });
    });
  }

  render() {
    return (
    <BrowserRouter>
      <Switch>
          <div>
            <Header title = "Sign Up For Courses"/>
              <Route path="/" component={Courses} />
              <Route path="/courses/create" component={CreateCourse} />
              <Route path="/courses/:id/update" component={UpdateCourse} />
              <Route path="/courses/:id" component={CourseDetail} />
              <Route path="/signin" component={UserSignIn} />
              <Route path="/signup" component={UserSignUp} />
              <Route path="/signOUT" component={UserSignOut} />
          </div>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
