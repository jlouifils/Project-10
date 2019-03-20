import React from "react";
import {Redirect} from "react-router-dom";


// This component logs out the user
export default class UserSignOut extends React.Component {
logOut = () => {
    window.localStorage.removeItem('FirstName')
    window.localStorage.removeItem('LastName')
    window.localStorage.removeItem('Email')
    window.localStorage.removeItem('Password')
    window.localStorage.removeItem('UserId')
    window.localStorage.removeItem('IsLoggedIn')
    window.location.assign('/UserSignIn')
    
  }
    componentDidMount() {
        this.logOut();
    }

    // Redirects to "/UserSignIn" after logging out user
    render(){
        return(
            <Redirect to="/UserSignIn" />
        )
    }
}

