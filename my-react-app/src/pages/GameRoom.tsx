/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { GameSession } from '../interfaces/gamesession.interface';
import GameRoomLobby from './GameRoomPages/GameRoomLobby';
import GameRoomRound from './GameRoomPages/GameRoomRound';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography } from '@mui/joy';
import styles from '../assets/MuiStyles';
import { useRef } from 'react';
const {subheaderFontSize} = styles;
import { Player } from '../interfaces/player.interface';
import { client } from '../assets/PlayerSocket';
import { AxiosResponse } from 'axios';
const GameRoom: React.FC<GameSession> = () => {

    const playerData = useRef<Player>();
    const isPlayerHost = useRef<boolean | 'loading'>('loading');
    const { roomCode } = useParams();
    
    const navigate = useNavigate();

    const isPlayerHostFunction = async (player: Player | undefined): Promise<boolean> => {
        // console.log(player?.isHost as unknown === 'true')
        return player?.isHost as unknown === 'true';
    }

    const {isLoading: isGameDataLoading, isError, data: gameSession} = useQuery({
        queryKey: ['gameRoomData'],
        queryFn: async () => {
            const {data: gameSession}: AxiosResponse<any> = await axios.get('http://localhost:3000/game-sessions/retrieve-one', { params: { roomCode }});
            const {data: player}: AxiosResponse<any> = await axios.get('http://localhost:3000/game-sessions/retrieve-one-player', {params:{uid: client.getSocketId(), gameSession: gameSession}});
            playerData.current = player
            isPlayerHost.current = await isPlayerHostFunction(playerData.current);
            return gameSession;
        }, retry: false,
        onError: () => {
            alert('The game session was not found, Or you were trying to enter a game session you are not in')
            navigate('/')
        }
    })

    if(gameSession){
        if(gameSession.gameState.lobbyPhase){
            return(
                <GameRoomLobby gameSession={gameSession} player={playerData.current!} display={gameSession.gameState.lobbyPhase ? 'flex' : 'none'} isGameDataLoading={isGameDataLoading} isPlayerHost={isPlayerHost.current} />
            )
        }
        else if(gameSession.gameState.gamePhase){
            return (
                <GameRoomRound gameSession={gameSession} player={playerData.current!} display={gameSession.gameState.gamePhase === true ? 'flex' : 'none'} isGameDataLoading={isGameDataLoading} isPlayerHost={isPlayerHost.current} />
            )
        }
        else{
            return (
                <Typography level='h3' fontSize={subheaderFontSize} >Error</Typography>
            )
        }
    }

    else if(isGameDataLoading || isError){
        return <Typography level='h3' fontSize={subheaderFontSize} >Loading...</Typography>
    }
}
export default GameRoom;