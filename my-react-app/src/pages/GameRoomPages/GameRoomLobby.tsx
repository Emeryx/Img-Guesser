/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack, Typography, Button, Skeleton } from '@mui/joy'
import styles from '../../assets/MuiStyles'
const { headerFontSize, subheaderFontSize } = styles;
import PlayerContainer from '../../assets/GameRoomPlayerContainer';
// import { Player } from '../../../back-end/src/schemas/player.interface'
import GameRoomPageProps from './GameRoomPageProps.interface';
import { client } from '../../assets/PlayerSocket';
import { useQueryClient } from 'react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// { name, image, isHost }
const GameRoomLobby: React.FC<GameRoomPageProps> = ({ gameSession, player, display, isGameDataLoading, isPlayerHost }) => {

    const navigate = useNavigate()

    const queryClient = useQueryClient();

    useEffect(() => {

        client.getSocket().on('host-left', () => {
            navigate('/');
        })

        client.getSocket().on('player-connected', async () => {
            await queryClient.invalidateQueries(['gameRoomData'])
        })

        client.getSocket().on('player-left', async () => {
            await queryClient.invalidateQueries(['gameRoomData'])
        })

        client.getSocket().on('player-ready', async () => {
            await queryClient.invalidateQueries(['gameRoomData'])
        })
        
        return () => {
            client.getSocket().removeListener('player-connected')
            client.getSocket().removeListener('player-ready')
            // Client will not unsubscribe to player-left & host-left when the component unmounts because players can leave mid game.
        };
    })

    const playerReadyUp = () => {
        client.handleReadyState(gameSession.roomCode);
    }

    const startGame = () => {
        console.log('Peekaboo')
    }

    return (
        <Stack direction='column' justifyContent='center' alignItems='center' spacing={4} sx={{ m: 8, display: display }}>
            {/*  Header */}
            <Typography level='h1' fontSize={headerFontSize} sx={{ pb: 4 }} >Img Guesser</Typography>
            {/*  Joining user input */}
            <Typography level='h4' fontSize='1.25rem' >Waiting for players...</Typography>
            <Typography level='h3' fontSize={subheaderFontSize} >Room Code: {gameSession.roomCode}</Typography>
            <Stack sx={{ py: 4, maxWidth: '1200px' }} direction={{ xs: 'column', md: 'row' }} flexWrap='wrap' justifyContent='center' alignItems='center' spacing={4} >
                {
                    gameSession.players.map((player, index) => {
                        return <PlayerContainer key={'Player' + index} uid={player.uid} name={player.name} image={player.image} isHost={player.isHost} score={player.score} ready={player.ready} />
                    })
                }
            </Stack>
            <Stack sx={{ maxWidth: '1200px' }} direction={{ xs: 'column', md: 'row' }} flexWrap='wrap' justifyContent='center' alignItems='center' spacing={4} >
                <Button onClick={isPlayerHost?startGame:playerReadyUp} color='success' size='lg' variant='solid'>
                    {isPlayerHost ? 'Start!' : 'Ready up'} <Skeleton animation='wave' sx={{ display: isPlayerHost === 'loading' ? 'block' : 'none', position: 'absolute', borderRadius: 'inherit', top: 0, left: 0 }}></Skeleton>
                </Button>
                <Button color='danger' size='lg' variant='solid'>
                    Leave
                </Button>
            </Stack>
        </Stack>
    )
}
export default GameRoomLobby;