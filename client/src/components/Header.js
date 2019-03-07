import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => 
{
    return(
        <div className='header'>
            <div className='bounds'>
                <h1 className='header--logo'>Courses</h1>
                <nav>
                    <Link className='signup' to={'/UserSignUp'}>Sign Up</Link>
                    <Link className="signin" to={'/UserSignIn'}>Sign In</Link>
                </nav>
            </div>
        </div>
    )
}



export default Header;

