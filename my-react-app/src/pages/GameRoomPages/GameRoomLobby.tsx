/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack, Typography, Button, Skeleton } from '@mui/joy'
import styles from '../../assets/MuiStyles'
const { headerFontSize, subheaderFontSize } = styles;
import PlayerContainer from '../../assets/GameRoomPlayerContainer';
// import { Player } from '../../../back-end/src/schemas/player.interface'
import GameRoomPageProps from './GameRoomPageProps.interface';
import { client } from '../../assets/PlayerSocket';
import { useQueryClient } from 'react-query';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import { Player } from '../../interfaces/player.interface';
import { useQuery } from 'react-query';
// { name, image, isHost }
const GameRoomLobby: React.FC<GameRoomPageProps> = ({ gameSession, display, isLoading }) => {

    const queryClient = useQueryClient();

    const playerData = useRef<Player>();
    const isPlayerHost = useRef<boolean>(false);

    useEffect(() => {

        client.getSocket().on('player-connected', async () => {
            console.log("PLAYER CONNECTED!");
            await queryClient.invalidateQueries(['gameRoomData'])
        })

        return () => {
            client.getSocket().removeListener('player-connected')
        };
    })

    const player = async () => {
        try{
            const player: any = await axios.get('http://localhost:3000/game-sessions/retrieve-one-player', {params:{uid: client.getSocketId(), gameSession: gameSession}});
            return player.data;
        }
        catch(error: any){
            const errorMessage = error?.response?.data?.message;
            console.log(errorMessage);
        }
    }

    const isPlayerHostFunction = async (player: Player | undefined): Promise<boolean> => {
        console.log(player?.isHost as unknown === 'true')
        return player?.isHost as unknown === 'true';
    }

    const fetchPlayerData = async () => {
        playerData.current = await player();
        isPlayerHost.current = await isPlayerHostFunction(playerData.current);
        // console.log(playerData.current);
        // console.log("RESULT: "+isPlayerHost.current);
    }

    const {isLoading: isPlayerDataLoading} = useQuery('PlayerData',fetchPlayerData)

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
                        return <PlayerContainer key={'Player' + index} name={player.name} image={player.image} isHost={player.isHost} score={player.score} ready={player.ready} />
                    })
                }
            </Stack>
            <Button sx={{display:isPlayerHost.current?'block':'none'}} color='neutral' size='lg' variant='solid'>
                Start! <Skeleton animation='pulse' sx={{display:isPlayerDataLoading?'block':'none' ,position:'absolute', borderRadius: 'inherit', top:0, left:0}}></Skeleton>
            </Button>
        </Stack>
    )
}
export default GameRoomLobby;