import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default class CourseDetail extends React.Component {
    constructor(props) {
      super(props);
      this.state = {course: [],
      user: [] };

      this.handleDelete = this.handleDelete.bind(this);
    }

    // got this info from erik from the slack that he post about Route Params
    componentDidMount() {
        const { match: { params } } =this.props
        axios.get(`http://localhost:5000/api/courses/${params.id}`)
        .then(({data: course}) => {
          this.setState({course})
        });
    }

    handleDelete() {
        const {match: {params}, history } =  this.props
        axios.delete(`http://localhost:5000/api/courses/${params.id}`)
        .then(() =>{
            history.push('/');
        });
    }

    render() {
        const { course } = this.state;
    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              <span>
                <NavLink to={`/courses/${course._id}/update`} className="button">
                  Update Course
                </NavLink>
                <NavLink to={'#'} className="button" onClick={this.handleDelete}>
                  Delete Course
                </NavLink>
              </span>
              <NavLink to="/"className="button button-secondary"href="index.html">
                Return to List
              </NavLink>
            </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{course.title}</h3>
            </div>
            <div className="course--description">
              <p>{course.description}</p>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{course.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    <li>{course.materialsNeeded}</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
