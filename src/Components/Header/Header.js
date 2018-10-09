import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react'

class Header extends Component {

    state = {}
        
    render() {
        return (
            <div>
                <img src="assets/img/waterBarLogo.jpg" id="logo" alt="The Water Bar logo"/>
                <a href="/" id="login-link">LOG IN</a>
                <button type="button" id="signup-button">SIGN UP</button>
            </div>
    
        )
    }
}

export default Header
