import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LevelSelectionPage from './pages/LevelSelectionPage';
import IntiLevel from './pages/IntiLevel';
import WayraLevel from './pages/WayraLevel';
import TierraVivaLevel from './pages/TierraVivaLevel';
import KallpunaLevel from './pages/KallpunaLevel';
import CollectionPage from './pages/CollectionPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/nivel" element={<LevelSelectionPage />} />
        <Route path="/nivel/inti" element={<IntiLevel />} />
        <Route path="/nivel/wayra" element={<WayraLevel />} />
        <Route path="/nivel/tierra-viva" element={<TierraVivaLevel />} />
        <Route path="/nivel/kallpuna" element={<KallpunaLevel />} />
        <Route path="/coleccion" element={<CollectionPage />} />
      </Routes>
    </Router>
  );
};

export default App;