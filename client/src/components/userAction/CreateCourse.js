import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export default class CreateCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            estimatedTime: "",
            materialsNeeded: "",

        };
        // found out how to use this.handleSubmit on stackoverflow https://stackoverflow.com/questions/41507337/in-redux-when-do-i-need-to-use-bindthis
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    change = (event) => {
        this.setState({
        [event.target.name]: event.target.value
        })
    }

    handleSubmit = (evt) => {
        evt.preventDeflaut();

       // found a website that help better use of axios https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index 
        axios({
            method: 'post',
            url: 'http://localhost:5000/api/courses',
            auth: {
              username: window.localStorage.getItem("Email"),
              password: window.localStorage.getItem("Password")
            },
            data: {
                title: this.state.title,
                description: this.state.description,
                estimatedTime: this.state.estimatedTime,
                materialsNeeded: this.state.materialsNeeded
                }  
            })
            .then(alert('course created!'))
            .then( ()=> {
                const { history } =this.props;
                history.push('/')
            })
        };
        
render() {
    return ( //JSX inside
     <div>
     <hr />
     <div className="bounds course--detail">
       <h1>Create Course</h1>
       <div>
         <form onSubmit={ this.handleSubmit}>
           <div className="grid-66">
             <div className="course--header">
               <h4 className="course--label">Course</h4> {/*add onChange so that we can change state as the user types on all the inputs */}
               <div><input  
               value={this.state.title} 
               onChange={e => this.change(e)}
               id="title" 
               name="title" 
               type="text" 
               className="input-title course--title--input" 
               placeholder="Course title..."/></div>

               <p>{this.state.user}</p>
             </div>
             <div className="course--description">
               <div><textarea 
               value={this.state.description} 
               onChange={e => this.change(e)}
               id="description" 
               name="description"  
               placeholder="Course description..." /></div>
             </div>
           </div>
           <div className="grid-25 grid-right">
             <div className="course--stats">
               <ul className="course--stats--list">
                 <li className="course--stats--list--item">
                   <h4>Estimated Time</h4>
                   <div><input 
                   value={this.state.estimatedTime} 
                   onChange={e => this.change(e)}
                   id="estimatedTime" 
                   name="estimatedTime" 
                   type="text" className="course--time--input" 
                   placeholder="Hours" />
                   </div>
                 </li>
                 <li className="course--stats--list--item">
                   <h4>Materials Needed</h4>
                   <div><textarea 
                   value={this.state.materialsNeeded} 
                   onChange={e => this.change(e)}
                   id="materialsNeeded" 
                   name="materialsNeeded"  
                   placeholder="List materials..."/>
                   </div>
                 </li>
               </ul>
             </div>
           </div>
           <div className="grid-100 pad-bottom"><button className="button"  type="submit">Create Course</button><NavLink to='/' className="button button-secondary">Cancel</NavLink></div>
         </form>
       </div>
     </div>
   </div> 
  );
 } 

}  
  
