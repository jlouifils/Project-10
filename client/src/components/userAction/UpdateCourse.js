import React from 'react';
import  axios  from "axios";
import { Navlink } from 'react-router-dom';



export default class UpdateCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        course: [],
        user: [],
        title: '', 
        description: '',
        estimatedTime: '',
        materialsNeeded: ''
        };
        // found out how to use this.handleSubmit/Cancel on stackoverflow https://stackoverflow.com/questions/41507337/in-redux-when-do-i-need-to-use-bindthis
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    change = (event) => {
        this.setState({
        [event.target.name]: event.target.value
        })
    }
    handleSubmit = (e) => {
        var {match:{ params }} = this.props;
        e.preventDefault();
// found a website that help better use of axios https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
        axios ({
            method: 'put',
            url: 'http://localhost:5000/api/courses/${params.id}',
            data: {
                title: this.state.title,
                description: this.state.description,
                estimatedTime: this.state.estimatedTime,
                materialsNeeded: this.state.materialsNeeded
                }
        })
        .then(alert('course updated!')
        ).then( () => {
            const { history } = this.props;
            history.push('/api')
        })
    };

    handleCancel = (evt) => {
        var {match:{ params }, history } = this.props;
        var course = this.state;
        evt.preventDefault();
        history.push('/course/${course._id}')
    }
    componentDidMount() {
        const {match: { params }} = this.props;
        axios
      .get(`http://localhost:5000/api/courses/${params.id}`)
      .then(results => {
          this.setState({
              course: results.data,
              user: results.data.user
          });
      });

    }

    render() {
        const { user, course} = this.state; 
         return ( 
          <div>
          <hr />
          <div className="bounds course--detail">
            <h1>Update Course</h1>
            <div>
              <form onSubmit={ this.handleSubmit}>
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." defaultValue={course.title}  onChange={e => this.change(e)} /></div>
                  </div>
                  <div className="course--description">
                    <div><textarea id="description" name="description"  placeholder="Course description..." defaultValue={this.state.course.description} onChange={e => this.change(e)}/> </div>
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" defaultValue={course.estimatedTime} onChange={e => this.change(e)} /></div>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div><textarea id="materialsNeeded" name="materialsNeeded" placeholder="List materials..." defaultValue={this.state.course.materialsNeeded}  onChange={e => this.change(e)} /></div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick={this.handleCancel}>Cancel</button></div>
              </form>
            </div>
          </div>
        </div> 
       );
      } 
    
}

