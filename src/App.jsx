import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NewsFeed from './pages/NewsFeed.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<NewsFeed />} />
      <Route path="/news" element={<NewsFeed />} />
    </Routes>
  )
}

export default App
