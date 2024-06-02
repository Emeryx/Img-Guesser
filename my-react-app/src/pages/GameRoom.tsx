/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { GameSession } from '../interfaces/gamesession.interface';
import GameRoomLobby from './GameRoomPages/GameRoomLobby';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography } from '@mui/joy';
import styles from '../assets/MuiStyles';
import { Suspense, useEffect, useRef } from 'react';
const {subheaderFontSize} = styles;
import { Player } from '../interfaces/player.interface';
import { client } from '../assets/PlayerSocket';
import { AxiosResponse } from 'axios';
const GameRoom: React.FC<GameSession> = () => {

    const playerData = useRef<Player>();
    const isPlayerHost = useRef<boolean | 'loading'>('loading');
    const { roomCode } = useParams();
    
    const navigate = useNavigate();

    const player = async (gameSession: GameSession) => {
        try{
            const player: AxiosResponse<any> = await axios.get('http://localhost:3000/game-sessions/retrieve-one-player', {params:{uid: client.getSocketId(), gameSession: gameSession}});
            return player.data;
        }
        catch(error: any){
            console.log('DASILUTDAUIYTDS8YUFRSU8I')
            const errorMessage = error?.response?.data?.message;
            alert(errorMessage);
            navigate('/')
        }
    }

    const isPlayerHostFunction = async (player: Player | undefined): Promise<boolean> => {
        // console.log(player?.isHost as unknown === 'true')
        return player?.isHost as unknown === 'true';
    }

    const {isLoading: isGameDataLoading, isError, data: gameSession} = useQuery({
        queryKey: ['gameRoomData'],
        queryFn: async () => {
            const {data: gameSession} = await axios.get('http://localhost:3000/game-sessions/retrieve-one', { params: { roomCode }});
            playerData.current = await player(gameSession);
            isPlayerHost.current = await isPlayerHostFunction(playerData.current);
            return gameSession;
        }, retry: false,
        onError: () => {
        }
    })

    useEffect(()=>{
        // const fetchPlayerData = async () => {
        //     try{
        //         playerData.current = await player();
        //         isPlayerHost.current = await isPlayerHostFunction(playerData.current);
        //     }
        //     catch(error){
        //         console.log(error);
        //     }
        // }
        // fetchPlayerData()
    })

    if(isError){
        return <Typography level='h3' fontSize={subheaderFontSize} >Invalid game room</Typography>
    }

    else if(gameSession){
        return (
            <GameRoomLobby gameSession={gameSession} player={playerData.current!} display={gameSession.gameState.lobbyPhase ? 'flex' : 'none'} isGameDataLoading={isGameDataLoading} isPlayerHost={isPlayerHost.current} />
        )
    }

    else if(isGameDataLoading){
        return <Typography level='h3' fontSize={subheaderFontSize} >Loading...</Typography>
    }
}
export default GameRoom;