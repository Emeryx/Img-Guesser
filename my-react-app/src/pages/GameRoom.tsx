import { Stack, Typography, Button } from '@mui/joy'
import styles from '../assets/MuiStyles'
const { headerFontSize, subheaderFontSize } = styles;
import PlayerContainer from '../assets/GameRoomPlayerContainer';
// import { Player } from '../../../back-end/src/schemas/player.interface'
import { GameSession } from '../../../back-end/src/schemas/gamesession.interface'

// { name, image, isHost }
const GameRoom : React.FC<GameSession> = ({roomCode, players}) => {
    return (
        <Stack direction='column' justifyContent='center' alignItems='center' spacing={4} sx={{ m: 8 }}>
            {/*  Header */}
            <Typography level='h1' fontSize={headerFontSize} sx={{ pb: 4 }} >Img Guesser</Typography>
            {/*  Joining user input */}
            <Typography level='h4' fontSize='1.25rem' >Waiting for players...</Typography>
            <Typography level='h3' fontSize={subheaderFontSize} >Room Code: {roomCode}</Typography>
            <Stack sx={{py:4}} direction={{ xs: 'column', md: 'row' }} flexWrap='wrap' justifyContent='center' alignItems='center' spacing={4} >
                {
                    players.map((player, index)=>{
                        return <PlayerContainer key={index} name={player.name} image={player.image} isHost={player.isHost} />
                    })
                }
            </Stack>
            <Button color='neutral' size='lg' variant='solid'>Start!</Button>
        </Stack>
    )
}
export default GameRoom;