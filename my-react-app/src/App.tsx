// import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main'
import HostGame from './pages/HostGame';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={Main} />
        <Route path='/h' Component={HostGame} />
      </Routes>
    </Router>
  )
}

export default App;
