import { useNavigate } from 'react-router-dom';
import { Stack, Typography, Input, Button } from '@mui/joy'
import styles from '../assets/MuiStyles'
const { headerFontSize, subheaderFontSize } = styles;
import axios from 'axios';
import { useState, useEffect } from 'react';
import RandomIconGenerator from '../assets/RandomIconGenerator';
import { client } from '../assets/PlayerSocket';

interface nameErrorDisplayProps {
    display: string,
    errorMessage: string
}

function Main() {
    const navigate = useNavigate();
    const [roomCode, setRoomCode] = useState<string>('');
    const [playerDisplayName, setPlayerDisplayName] = useState<string>('');
    const [nameErrorDisplay, setNameErrorDisplay] = useState<nameErrorDisplayProps>({display: 'none', errorMessage: ''});
    
    const goToHostGame = () => {
      navigate('/h');
    }

    const joinGame = async () => {
        try {
            await axios.post('http://localhost:3000/game-sessions/join',{roomCode: roomCode, playerDisplayName: playerDisplayName, randomImage: RandomIconGenerator(), uid: client.getSocketId()})
            client.handleJoinRoom(roomCode);
            navigate(`/r/${roomCode}`)
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch(error: any){
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

    return (
        <Stack direction='column' justifyContent='center' alignItems='center' spacing={4} sx={{ m: 8, backgroundColor: 'custom.background' }}>
            {/*  Header */}
            <Typography level='h1' fontSize={headerFontSize} sx={{ pb: 4 }} textColor='custom.primary'>Img Guesser</Typography>
            {/*  Joining user input */}
            <Typography level='h4' fontSize='1.25rem' textColor='custom.secondary'>Join a game</Typography>
            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent='center' alignItems='center' spacing={4} >
                <Stack direction='column' justifyContent='center' alignItems='center' spacing={2}>
                    <Typography level='h3' fontSize={subheaderFontSize} textColor='custom.primary'>Display Name</Typography>
                    <Input value={playerDisplayName} onChange={(event) => setPlayerDisplayName(event.target.value)} size="md" color="neutral" variant="outlined" placeholder="Enter display name" />
                </Stack>
                <Stack direction='column' justifyContent='center' alignItems='center' spacing={2}>
                    <Typography level='h3' fontSize={subheaderFontSize} textColor='custom.primary'>Room Code</Typography>
                    <Input value={roomCode} onChange={(event) =>{
                        const newCharacter: string = event.target.value.charAt(event.target.value.length - 1);
                        if(!isNaN(parseFloat(newCharacter)) || event.target.value.length > 4) return;
                        setRoomCode(event.target.value.toUpperCase())}
                    } size="md" color="neutral" variant="outlined" placeholder="Enter room code" />
                </Stack>
            </Stack>
            <Typography level='h4' fontSize='1.25rem' sx={{display:nameErrorDisplay.display}} >{nameErrorDisplay.errorMessage}</Typography>
            <Button onClick={joinGame} color='neutral' size='lg' variant='solid'>Play!</Button>
            {/*  Button to create a game */}
            <Typography level='h4' fontSize='1.25rem' sx={{ pt: 2 }}>Or alternatively...</Typography>
            <Button color='neutral' size='lg' variant='solid' onClick={goToHostGame}>Host a game</Button>
        </Stack>
    )
}

export default Main;
