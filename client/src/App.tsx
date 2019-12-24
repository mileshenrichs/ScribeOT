import React from 'react';
import './App.css';
import Home from './components/home/Home';
import {BrowserRouter, Route} from 'react-router-dom';
import Document from './components/document/Document';
import About from './components/about/About';
import Header from "./components/header/Header";

const App: React.FC = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Route exact path="/">
                    <Home />
                </Route>

                <Route exact path="/document/:docId">
                    <Header />
                    <Document />
                </Route>

                <Route exact path="/about">
                    <Header />
                    <About />
                </Route>
            </BrowserRouter>
        </div>
    );
};

export default App;
