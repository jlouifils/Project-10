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
import PrivateRoute from "./components/userAction/PrivateRoute"
import UserSignOut from "./components/userAction/UserSignOut";


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {

    };
    this.signIn = this.signIn.bind(this);
  }

  // also found this on a different website https://medium.com/technoetics/create-basic-login-forms-using-create-react-app-module-in-reactjs-511b9790dede
  // @EmmaW told me that moving my signIn method to my app.js was better
  signIn(userInfo) {
    axios.get("http://localhost:5000/api/users", {
      auth: {
        username: userInfo.emailAddress,
        password: userInfo.password
      }
    }).then(results => { console.log(results.data)
      //brain ball help undertand how to use windoow.localStorage in my projrect https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem
      window.localStorage.setItem('FirstName',results.data.firstName)
      window.localStorage.setItem('LastName', results.data.lastName)
      window.localStorage.setItem('Email',userInfo.emailAddress)
      window.localStorage.setItem('Password',userInfo.password)
      window.localStorage.setItem('UserId', JSON.stringify(results.data._id))
      window.localStorage.setItem('IsLoggedIn', JSON.stringify(true))
      window.location.assign('/')
    })

  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header  />
          <Switch>
            <Route exact path="/" component={Courses} />
            <PrivateRoute path="/courses/create"  component={CreateCourse} /> 
            <PrivateRoute path="/courses/:id/update" component={UpdateCourse} /> 
            <Route exact path="/courses/:id" component={CourseDetail} />
            <Route exact path="/UsersignIn" component={() => <UserSignIn  signIn={this.signIn}/>} /> 
            <Route exact path="/UserSignUp" component={UserSignUp} />
            <Route exact path="/UserSignOut" component={UserSignOut} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
