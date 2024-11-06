import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hangman from './components/Hangman';
import Wordle from './components/Wordle';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/hangman" element={<Hangman />} />
                    <Route path="/wordle" element={<Wordle />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;