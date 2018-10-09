import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react'

class DropDownButton extends Component {

    state = {
        visible: true
    }

    render() {

        return ( this.state.visible &&
            <li className="dropdown">
                <a className="dropdown-toggle nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false" href="/">{this.props.name}</a>
                <div className="dropdown-menu" role="menu">

                    {this.props.options.map ( (option, index) =>
                        // <a className='dropdown-item' role='presentation' href={'/options2/' + option}>{option}</a>
                        <a className='dropdown-item' role='presentation' href='/' key={index.toString()}>{option}</a>
                        )}
                </div>
            </li>
        )
    }
}

export default DropDownButton