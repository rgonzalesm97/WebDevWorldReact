import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class Header extends Component{
    render(){
        return (
            <header id="header">
                <div className="center">

                    <div id="logo">
                        <span id="brand">
                            <strong>WebDevWorld</strong>
                        </span>
                    </div>


                    <nav id="menu">
                        <ul>
                            <li>
                                <NavLink to='/home' activeClassName='active'>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to='/blog' activeClassName='active'>Blog</NavLink>
                            </li>
                            <li>
                                <NavLink to='/form' activeClassName='active'>Form</NavLink>
                            </li>
                        </ul>
                    </nav>

                    <div className="clearfix"></div>
                </div>
            </header>
        );
    }
}

export default Header;