import { useNavigate } from 'react-router-dom';
import { Stack, Typography, Input, Button } from '@mui/joy'
import styles from '../assets/MuiStyles'
const { headerFontSize, subheaderFontSize } = styles;
import axios from 'axios';
import { useState } from 'react';
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
        if(playerDisplayName===''){
            setNameErrorDisplay({
                display: 'block',
                errorMessage: 'Please type a valid name!'
            });
            return;
        } // Don't do anything if owner display name is null
        else if(playerDisplayName.length>16){
            setNameErrorDisplay({
                display: 'block',
                errorMessage: 'Your name should not contain more than 16 characters'
            });
            return;
        }
        try {
            const response = await axios.get('http://localhost:3000/game-sessions/retrieve-one',
            {
                params: { inputtedRoomCode: roomCode }
            });
            console.log(response);
        }
        catch(error){
            console.error(error);
        }
    }
    return (
        <Stack direction='column' justifyContent='center' alignItems='center' spacing={4} sx={{ m: 8 }}>
            {/*  Header */}
            <Typography level='h1' fontSize={headerFontSize} sx={{ pb: 4 }} >Img Guesser</Typography>
            {/*  Joining user input */}
            <Typography level='h4' fontSize='1.25rem' >Join a game</Typography>
            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent='center' alignItems='center' spacing={4} >
                <Stack direction='column' justifyContent='center' alignItems='center' spacing={2}>
                    <Typography level='h3' fontSize={subheaderFontSize} >Display Name</Typography>
                    <Input value={playerDisplayName} onChange={(event) => setPlayerDisplayName(event.target.value)} size="md" color="neutral" variant="outlined" placeholder="Enter display name" />
                </Stack>
                <Stack direction='column' justifyContent='center' alignItems='center' spacing={2}>
                    <Typography level='h3' fontSize={subheaderFontSize} >Room Code</Typography>
                    <Input value={roomCode} onChange={(event) => setRoomCode(event.target.value)} size="md" color="neutral" variant="outlined" placeholder="Enter room code" />
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
