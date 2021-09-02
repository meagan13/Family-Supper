import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css'
// import PageNotFound from '../assets/images/PageNotFound';


class NotFoundPage extends React.Component{
    render(){
        return <div className="not-found-page-div">
            <div className="not-found-text-div">
                <h1 className="not-found-text">Page Not Found</h1>
            </div>

            <div className="not-found-home-div">
                <h3 className="return-home-text">
                <Link to="/"className="return-home-link">Return Home</Link>
                </h3>
            </div>
          </div>;
    }
}
export default NotFoundPage;
