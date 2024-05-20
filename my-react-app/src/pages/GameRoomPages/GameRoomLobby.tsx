import { Stack, Typography, Button } from '@mui/joy'
import styles from '../../assets/MuiStyles'
const { headerFontSize, subheaderFontSize } = styles;
import PlayerContainer from '../../assets/GameRoomPlayerContainer';
// import { Player } from '../../../back-end/src/schemas/player.interface'
import GameRoomPageProps from './GameRoomPageProps.interface';
import { useState } from 'react';
import { Player } from '../../../../back-end/src/schemas/player.interface';

// { name, image, isHost }
const GameRoomLobby: React.FC<GameRoomPageProps> = ({ gameSession, display }) => {

    const [players, setPlayers] = useState<Player[]>(gameSession.players)

    return (
        <Stack direction='column' justifyContent='center' alignItems='center' spacing={4} sx={{ m: 8, display: display }}>
            {/*  Header */}
            <Typography level='h1' fontSize={headerFontSize} sx={{ pb: 4 }} >Img Guesser</Typography>
            {/*  Joining user input */}
            <Typography level='h4' fontSize='1.25rem' >Waiting for players...</Typography>
            <Typography level='h3' fontSize={subheaderFontSize} >Room Code: {gameSession.roomCode}</Typography>
            <Stack sx={{ py: 4, maxWidth: '1200px' }} direction={{ xs: 'column', md: 'row' }} flexWrap='wrap' justifyContent='center' alignItems='center' spacing={4} >
                {
                    players.map((player, index) => {
                        return <PlayerContainer key={'Player' + index} name={player.name} image={player.image} isHost={player.isHost} score={player.score} ready={player.ready} />
                    })
                }
            </Stack>
            <Button color='neutral' size='lg' variant='solid'>Start!</Button>
        </Stack>
    )
}
export default GameRoomLobby;