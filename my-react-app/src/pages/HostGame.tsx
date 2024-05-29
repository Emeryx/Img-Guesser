import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Stack, Typography, Input, Button, Slider, Box } from '@mui/joy'
import axios from "axios";
import styles from '../assets/MuiStyles'
const { headerFontSize, subheaderFontSize } = styles;
// import RoomCodeGenerator from "../assets/RoomCodeGenerator";
import RandomIconGenerator from "../assets/RandomIconGenerator";
import { client } from "../assets/PlayerSocket";
interface nameErrorDisplayProps {
    display: string,
    errorMessage: string
}

const HostGame = () => {
    const navigate = useNavigate();
    
    const startGame = async () => {
        try {
            const { data: gameSession } = await axios.post('http://localhost:3000/game-sessions/create', {hostName: ownerDisplayName, hostImage: RandomIconGenerator(), roundTime: timePerRound, roundAmount: rounds, hostUid: client.getSocketId()})
            client.handleJoinRoom(gameSession.roomCode);
            navigate(`/r/${gameSession.roomCode}`)
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (error: any){
            const errorMessage = error?.response?.data?.message;
            console.log(errorMessage);
            setNameErrorDisplay({
                display: 'block',
                errorMessage: errorMessage
            });
        }
    }

    useEffect(()=>{
        client.handleLeaveRooms();
    },[])

    const [nameErrorDisplay, setNameErrorDisplay] = useState<nameErrorDisplayProps>({display: 'none', errorMessage: ''});
    const [ownerDisplayName, setOwnerDisplayName] = useState('');
    const [timePerRound, setTimePerRound] = useState<number | number[]>(30);
    const [rounds, setRounds] = useState<number | number[]>(6);

    return (
        <Stack direction='column' justifyContent='center' alignItems='center' spacing={4} sx={{ m: 8 }}>
            {/*  Header */}
            <Typography level='h1' fontSize={headerFontSize} sx={{ pb: 4 }} >Img Guesser</Typography>

            <Typography level='h1' sx={{ pb: 2 }} >Host a game</Typography>

            <Typography level='h3' fontSize={subheaderFontSize} >Your Display Name</Typography>
            <Input size="md" value={ownerDisplayName} onChange={(event) => setOwnerDisplayName(event.target.value)} color="neutral" variant="outlined" placeholder="Enter display name" />
            <Typography level='h4' fontSize='1.25rem' sx={{display:nameErrorDisplay.display}} >{nameErrorDisplay.errorMessage}</Typography>

            <Typography level='h3' fontSize={subheaderFontSize} >Rounds</Typography>
            <Box sx={{width: '400px'}}>
                <Slider onChange={ (event, newRounds) => setRounds(newRounds) } aria-label="Custom marks" color='primary' value={rounds} min={3} max={12} step={1} valueLabelDisplay="on" sx={{"--Slider-trackSize": "7px"}}/>
            </Box>

            <Typography level='h3' fontSize={subheaderFontSize} >Time per round (seconds)</Typography>
            <Box sx={{width: '400px'}}>
                <Slider onChange={ (event, newTime) => {setTimePerRound(newTime)} } aria-label="Custom marks" color='primary' value={timePerRound} min={15} max={75} step={5} valueLabelDisplay="on" sx={{"--Slider-trackSize": "7px"}}/>
            </Box>

            <Button color='neutral' size='lg' variant='solid' onClick={startGame}>Start game!</Button>
        </Stack>
    )
}

export default HostGame