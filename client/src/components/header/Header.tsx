import React from 'react';
import {Link} from 'react-router-dom';
import scribeLogo from '../../assets/scribe-logo.png';

const Header: React.FC = () => (
    <div className="Header">
        <Link to="/">
            <img src={scribeLogo} alt="ScribeOT" />
        </Link>

        <nav>
            <ul>
                <li><Link to="/about">About ScribeOT</Link></li>
                <li><Link to="/">Logout</Link></li>
            </ul>
        </nav>
    </div>
);

export default Header;