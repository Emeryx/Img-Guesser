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
  },
  colorSchemes: {
    light: { // I put light even though the BG is dark because there is only dark mode, The default mode is light and to change it I have to clean localStorage which is too much of a hassle to do while I develop the backend that relies on localStorage
      palette:  {
        custom: {
          primary: '#003F88',
          secondary: '#00509D',
          background: '#FCFCFF',
          accent: '#FFD500',
          error: '#FF3E3E'
        }
      }
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
