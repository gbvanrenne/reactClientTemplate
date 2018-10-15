import './Header.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'

class Header extends Component {

    state = {}
        
    render() {
        return (

        <header className="navbar navbar-expand flex-column flex-md-row navbar-light">
            <a className="navbar-brand mr-0 mr-md-2" href="#">
                <img src="assets/img/waterBarLogo.jpg" id="logo" alt="The Water Bar logo"/>
            </a>

            <div className="navbar-nav-scroll">
                <ul className="navbar-nav flex-row">
                    <li className="nav-item">
                        <h2 id="header-title">Customer Refill Manager</h2>
                    </li>
                    <li className="nav-item">
                        <a 
                            className="btn btn-login d-none d-lg-inline-block mb-3 mb-md-0 ml-md-3"
                            id="login" href="/login"
                        >
                            Log in
                        </a>
                    </li>                    
                </ul>
            </div>        
        </header>
    
        )
    }
}

export default Header
