import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export default class UserSignUp extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            firstName: '',
            lastName: '',
            emailAdress: '',
            password: '',
            comfirmPassword: ''
         };
         this.handleSubmit = this.handleSubmit.bind(this);   
    }
    handleSubmit = (evt) => {
        evt.preventDeflaut();

        axios({
            method: 'post',
            url: 'http://localhost:5000/api/users/',
            data: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                emailAddress: this.state.emailAddress,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
              }
        }).then(
            alert('Your account was successfully created!')
            )
            .then( () =>{
            const { history } =this.props;
            history.push('/')
        })
    };

    change = (event) => {
        this.state({
            [event.target.name]:event.target.value
        })
    };

    render(){
         return(
            <div>
        <hr />
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
            <form onSubmit={this.handleSubmit}>
              <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" value={this.state.firstName} onChange={e => this.change(e)} /></div>
              <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" value={this.state.lastName} onChange={e => this.change(e)} /></div>
              <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value={this.state.emailAddress} onChange={e => this.change(e)} /></div>
              <div><input id="password" name="password" type="password" className="" placeholder="Password" value={this.state.password} onChange={e => this.change(e)} /></div>
              <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={e => this.change(e)} /></div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button>
                <NavLink to='/' className="button button-secondary">Cancel</NavLink></div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Already have a user account? 
              <NavLink to='/signin'>Click here</NavLink> to sign in!</p>
        </div>
      </div>
    </div>
        );
    }
}