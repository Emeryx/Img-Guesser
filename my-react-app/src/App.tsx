// import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main'
import HostGame from './pages/HostGame';
import GameRoom from './pages/GameRoom';
import { QueryClient, QueryClientProvider } from 'react-query';
import gameSessionMockup from './assets/gameSessionMockup';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
          <Routes>
            <Route path='/' Component={Main} />
            <Route path='/h' Component={HostGame} />
            <Route path='/r/:roomCode' element={<GameRoom {...gameSessionMockup} />} />
          </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App;
