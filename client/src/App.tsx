import React from 'react';
import './App.css';
import Home from './components/home/Home';
import {BrowserRouter, Route} from 'react-router-dom';
import Document from './components/document/Document';

const App: React.FC = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Route exact path="/">
                    <Home />
                </Route>

                <Route exact path="/document/:docId">
                    <Document />
                </Route>

                <Route exact path="/no-auth">
                    <h2>no auth</h2>
                </Route>
            </BrowserRouter>
        </div>
    );
};

export default App;
