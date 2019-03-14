import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'; 
import axios from 'axios';



export default class UserSignIn extends Component {
    constructor(props) {
      super(props);

      this.state = {
        emailAddress: '',
        password: '' 
      };
    }   
  
    signIn(emailAddress, password) {
      axios.get("http://localhost:5000/api/users", {
        auth: {
          username: emailAddress,
          password: password
        }
      }).then(results => {
        this.setState({
          emailAddress: results.data,
          password: results.data.user
        });
      }).then(
        alert('Sign in successful')
      )
      .then( () => {
        const {  history } = this.props;
        history.push(`/`)
      })
    }
  
    change = (evt)=> {
      this.setState({
        [evt.target.name]: evt.target.value
      })
    }
     
     render() {
       return ( 
        <div>
      <hr/>
      <div className="bounds"> 
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
            <form>
              <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value="" /></div>
              <div><input id="password" name="password" type="password" className="" placeholder="Password" value="" /></div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign In</button><NavLink to='/' className="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</NavLink></div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Don't have a user account? <NavLink to='/signup'>Click here</NavLink> to sign up!</p>
        </div>
      </div> 
    </div>
    )
  } 
}
     
     
