import axios from 'axios';
import { GameSession } from '../interfaces/gamesession.interface';
import GameRoomLobby from './GameRoomPages/GameRoomLobby';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/joy';
import styles from '../assets/MuiStyles';
import { Suspense } from 'react';
const {subheaderFontSize} = styles;
const GameRoom: React.FC<GameSession> = () => {

    const { roomCode } = useParams();
    const {isLoading, error, data} = useQuery({
        queryKey: ['gameRoomData'],
        queryFn: async () => {
            const {data: gameSession} = await axios.get('http://localhost:3000/game-sessions/retrieve-one', { params: { roomCode }});
            console.log(gameSession)
            if(!gameSession){
                throw new Error('Invalid game room')
            }
            return gameSession;
        }, suspense: true
    })

    if(error){
        return <Typography level='h3' fontSize={subheaderFontSize} >Invalid game room</Typography>
    }
    else{
        return (
            <Suspense>
                <GameRoomLobby gameSession={data} display={data.gameState.lobbyPhase ? 'flex' : 'none'} isLoading={isLoading} />
            </Suspense>
        )
    }
}
export default GameRoom;