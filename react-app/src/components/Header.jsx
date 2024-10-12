import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/header.css';

function Header() {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/" title="Home">
                            <i className="material-icons">home</i>
                            <span>Inicio</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;