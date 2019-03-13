import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';


export default class Courses extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        courses: [] 
      };
    }   
  
    componentDidMount() {
      axios.get('http://localhost:5000/api/courses')
      .then(results => { 
        this.setState({ 
         courses: results.data
      })
      console.log(results)
      })
     }
     
     render() {
       const{courses} = this.state;   
       return ( 
        <div className="bounds"> 
            {courses.map(course => <div key={course._id} className="grid-33">
                <NavLink to={`/courses/${course._id}`} className="course--module course--link" > 
                    <h4 className="course--label">Course</h4>  
                    <h3 className="course--title">{course.title}</h3>  
                 </NavLink> 
         </div>
     )} 
         
<div className="grid-33">
        <NavLink to='/courses/create' className="course--module course--add--module" >
            <h3 className="course--add--title">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" // to help me understand better about vectors https://blog.lftechnology.com/using-svg-icons-components-in-react-44fbe8e5f91
                viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>New Course</h3>
        </NavLink>
     </div>
</div> 
         
       )
    } 
}
     
     
