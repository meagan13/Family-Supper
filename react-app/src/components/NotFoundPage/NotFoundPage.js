import React from 'react';
import { Link } from 'react-router-dom';
// import PageNotFound from '../assets/images/PageNotFound';


class NotFoundPage extends React.Component{
    render(){
        return <div>
            {/* <img src={PageNotFound}  /> */}
            <h1>Page Not Found</h1>
            <p style={{textAlign:"center"}}>
              <Link to="/">Return Home</Link>
            </p>
          </div>;
    }
}
export default NotFoundPage;
