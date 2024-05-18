// import { useState } from 'react'
import './App.css'
import { Stack, Typography, Input, Button } from '@mui/joy'
import styles from './assets/MuiStyles'
const { headerFontSize, subheaderFontSize } = styles;
function Lobby() {
  return (
    <Stack direction='column' justifyContent='center' alignItems='center' spacing={4} sx={{m:8}}>
      {/*  Header */}
      <Typography level='h1' fontSize={headerFontSize} sx={{pb:4}} >Img Guesser</Typography>
      {/*  Joining user input */}
      <Typography level='h4' fontSize='1.25rem' >Join a game</Typography>
      <Stack direction={{xs:'column', md: 'row'}} justifyContent='center' alignItems='center' spacing={4} >
        <Stack direction='column' justifyContent='center' alignItems='center' spacing={2}>
          <Typography level='h3' fontSize={ subheaderFontSize } >Display Name</Typography>
          <Input size="md" color="neutral" variant="outlined" placeholder="Enter display name" />
        </Stack>
        <Stack direction='column' justifyContent='center' alignItems='center' spacing={2}>
          <Typography level='h3' fontSize={ subheaderFontSize } >Room Code</Typography>
          <Input size="md" color="neutral" variant="outlined" placeholder="Enter room code" />
        </Stack>
      </Stack>
      <Button color='neutral' size='lg' variant='solid'>Play!</Button>
      {/*  Button to create a game */}
      <Typography level='h4' fontSize='1.25rem' sx={{pt:2}}>Or alternatively...</Typography>
      <Button color='neutral' size='lg' variant='solid'>Host a game</Button>
    </Stack>
  )
}

export default Lobby;
