import React from 'react';
import {Link} from 'react-router-dom';

const Home: React.FC = () => (
    <div>
        <span>hi</span>
        <p>
            <Link to="/document/200">to document</Link>
        </p>
    </div>
);

export default Home;