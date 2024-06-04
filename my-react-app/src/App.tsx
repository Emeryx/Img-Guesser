// import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main'
import HostGame from './pages/HostGame';
import GameRoom from './pages/GameRoom';
import { QueryClient, QueryClientProvider } from 'react-query';
import gameSessionMockup from './assets/gameSessionMockup';
import { CssVarsProvider, extendTheme } from '@mui/joy';

const theme = extendTheme({
  fontFamily: {
    display: 'Noto Sans, var(--joy-fontFamily-fallback)',
    body: 'Noto Sans, var(--joy-fontFamily-fallback)',
  },
  typography: {
    h1: {
      fontWeight: 700
    },
    h4: {
      letterSpacing: 0.25
    }
  }
})

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CssVarsProvider theme={theme}>
      <Router>
          <Routes>
            <Route path='/' Component={Main} />
            <Route path='/h' Component={HostGame} />
            <Route path='/r/:roomCode' element={<GameRoom {...gameSessionMockup} />} />
          </Routes>
      </Router>
      </CssVarsProvider>
    </QueryClientProvider>
  )
}

export default App;
