import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { Stack, Typography, Input, Button, Slider, Box } from '@mui/joy'
import styles from '../assets/MuiStyles'
const { headerFontSize, subheaderFontSize } = styles;
import RoomCodeGenerator from "../assets/RoomCodeGenerator";
const HostGame = () => {
    const navigate = useNavigate();
    const roomCode = useRef<string>(RoomCodeGenerator());
    const startGame = () => navigate(`/r/${roomCode.current}`)
    const [timePerRound, setTimePerRound] = useState<number | number[]>(30);
    const [rounds, setRounds] = useState<number | number[]>(6);
    return (
        <Stack direction='column' justifyContent='center' alignItems='center' spacing={4} sx={{ m: 8 }}>
            {/*  Header */}
            <Typography level='h1' fontSize={headerFontSize} sx={{ pb: 4 }} >Img Guesser</Typography>

            <Typography level='h1' sx={{ pb: 2 }} >Host a game</Typography>

            <Typography level='h3' fontSize={subheaderFontSize} >Your Display Name</Typography>
            <Input size="md" color="neutral" variant="outlined" placeholder="Enter display name" />

            <Typography level='h3' fontSize={subheaderFontSize} >Rounds</Typography>
            <Box sx={{width: '400px'}}>
                <Slider onChange={ (event, newRounds) => setRounds(newRounds) } aria-label="Custom marks" color='primary' value={rounds} min={3} max={12} step={1} valueLabelDisplay="on" sx={{"--Slider-trackSize": "7px"}}/>
            </Box>

            <Typography level='h3' fontSize={subheaderFontSize} >Time per round (seconds)</Typography>
            <Box sx={{width: '400px'}}>
                <Slider onChange={ (event, newTime) => setTimePerRound(newTime) } aria-label="Custom marks" color='primary' value={timePerRound} min={15} max={75} step={5} valueLabelDisplay="on" sx={{"--Slider-trackSize": "7px"}}/>
            </Box>

            <Button color='neutral' size='lg' variant='solid' onClick={startGame}>Start game!</Button>
        </Stack>
    )
}

export default HostGame