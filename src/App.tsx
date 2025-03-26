import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { LandingPage } from './pages/LandingPage';
import { RecipesPage } from './pages/RecipesPage';
import Chat from './pages/Chat';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/recipes" element={<RecipesPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;