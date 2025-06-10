// src/App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // <-- 1. Import the component
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Score from './pages/Score';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header /> {/* <-- 2. Use the component like an HTML tag */}
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/score" element={<Score />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;