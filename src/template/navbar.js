import React from "react";
import logo from '../pics/logo1.png';
import './navbar.css';


export function TopNav() {
    return (
        <header>
            <div className="top-nav" style={{
                backgroundColor: 'white',
                height: '50px',
                width: '100%',
                position: 'absolute',
                top: 0,
                left: 0
            }}>
                <ul style={{
                    listStyleType: 'none',
                    margin: 0,
                    marginTop: '2.3%',
                    marginLeft: '10%',
                    padding: 0
                }}>
                    <li style={{ float: 'left' }}>
                        <a href="#" >PROJECTS</a>
                    </li>
                    <li style={{ float: 'left' }}>
                        <a href="#">SIGN UP USERS</a>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export function Logo() {
    return (
        <div>
            <img className="logo-temp" src={logo} style={{ width: '60px', height: '60px', marginLeft: '-2px', marginTop: '2px' }} />
        </div>
    );
}

function NavBar() {
    return <div>
        <TopNav />
        <Logo />
    </div>

}

export default NavBar;