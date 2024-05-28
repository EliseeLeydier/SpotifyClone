// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { MainViewContainer } from './components/MainViewContainer';
import AlbumDetail from './components/AlbumDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><MainViewContainer /></Layout>} />
      <Route path="/album/:albumId" element={<Layout><AlbumDetail /></Layout>} />
    </Routes>
  );
}

export default App;
