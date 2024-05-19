// import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main'
import HostGame from './pages/HostGame';
import GameRoom from './pages/GameRoom';
import RandomIconGenerator from './assets/RandomIconGenerator';
const gameSessionMockup = {
  roomCode: 'ABCD',
  players: [
    {
      name: 'Emery',
      image: RandomIconGenerator(),
      isHost: true
    },
    {
      name: 'Rando',
      image: RandomIconGenerator(),
      isHost: false
    },
    {
      name: 'Awoo',
      image: RandomIconGenerator(),
      isHost: false
    },
    {
      name: 'One two',
      image: RandomIconGenerator(),
      isHost: false
    },
    {
      name: 'Bahaha',
      image: RandomIconGenerator(),
      isHost: false
    },
    {
      name: 'Slava Ukraini',
      image: RandomIconGenerator(),
      isHost: false
    },
    {
      name: 'I got political there',
      image: RandomIconGenerator(),
      isHost: false
    },
    {
      name: 'Lol',
      image: RandomIconGenerator(),
      isHost: false
    },
  ],
  roundTime: 45,
  roundAmount: 6
}
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={Main} />
        <Route path='/h' Component={HostGame} />
        <Route path='/r/*' element={<GameRoom {...gameSessionMockup} />} />
      </Routes>
    </Router>
  )
}

export default App;
