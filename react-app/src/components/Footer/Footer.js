import React from 'react';
import './Footer.css'

const Footer = () => {
    return (
        <>
            <div className="footer-div">
                {/* <div className="logo-div">
                    <img src="https://live.staticflickr.com/65535/51411133061_84b157b97a.jpg" className="logo-footer" alt='placholder logo'></img>
                </div> */}

                <div className="meagan-contact-info">
                    <h3 className="meagan-name-text">Meagan Smith</h3>
                    <a href="https://github.com/meagan13"><img src="https://image.flaticon.com/icons/png/512/25/25231.png" alt="github icon" className="github-icon"/></a>
                    <a href="https://www.linkedin.com/in/meaganhsmith"><img src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/linkedin_circle_black-512.png" alt="LinkedIn icon" className="linkedin-icon" /></a>
                </div>

                <div className="acknowledge">
                    <p className="acknowledge-text">Many thanks to many individuals who made this project and this journey possible.</p>
                </div>
                
                <div className="github-repo-div">
                    <a href="https://github.com/meagan13/Family-Supper" className="repo-text"><h2>Website GitHub Repo</h2></a>

                </div>

            </div>
        </>
    )
}


export default Footer;
