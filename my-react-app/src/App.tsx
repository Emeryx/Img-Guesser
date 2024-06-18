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
          primary: '#ffc107',
          secondary: '#FCFCFF',
          background: '#FCFCFF',
          accent: '#FFD500',
          error: '#FF3E3E'
        },
        warning: {
          solidColor: '#000',
          solidBg: '#ffc107',
          solidBorder: '#ffc107',
          solidHoverBg: '#ffca2c',
          solidHoverBorder: '#ffc720',
          solidActiveBg: '#ffcd39',
          solidActiveBorder: '#ffc720',
          solidDisabledBg: '#ffc107',
          solidDisabledBorder: '#ffc107',
        },
        primary: {
          solidBg: '#0d6efd',
          solidBorder: '#0d6efd',
          solidHoverBg: '#0b5ed7',
          solidHoverBorder: '#0a58ca',
          solidActiveBg: '#0a58ca',
          solidActiveBorder: '#0a53be',
          solidDisabledBg: '#0d6efd',
          solidDisabledBorder: '#0d6efd',
        },
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
