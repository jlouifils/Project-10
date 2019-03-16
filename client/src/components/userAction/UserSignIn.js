import React from 'react';
import { NavLink } from 'react-router-dom'; 
import axios from 'axios';

export default class UserSignIn extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        emailAddress: '',
        password: '',
        loggedIn: false
      };
      this.signIn = this.signIn.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }   

      handleSubmit = (event) => {
        event.preventDefault();
        let userInfo = {"password": this.state.password, "emailAddress": this.state.emailAddress}
        this.props.signIn(userInfo)
      }
// also found this on a different website https://medium.com/technoetics/create-basic-login-forms-using-create-react-app-module-in-reactjs-511b9790dede
    signIn(userInfo) {
      axios.get("http://localhost:5000/api/users", {
        auth: {
          username: userInfo.emailAddress,
          password: userInfo.password
        }
      }).then(results => {
        this.setState({
          emailAddress: userInfo.emailAddress,
          password: userInfo.password,
          loggedIn: true
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
      return ( //JSX inside
       <div>
     <hr/>
     <div className="bounds"> 
       <div className="grid-33 centered signin">
         <h1>Sign In</h1>
         <div>
           <form onSubmit={this.handleSubmit}>
             <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value={this.state.emailAddress} onChange={e => this.change(e)}  /></div>
             <div><input id="password" name="password" type="password" className="" placeholder="Password" value={this.state.password} onChange={e => this.change(e)} /></div>
             <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign In</button><NavLink to='/' className="button button-secondary">Cancel</NavLink></div>
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
     
     
