// import { Player } from '../../../back-end/src/schemas/player.interface'
import { GameSession } from '../../../back-end/src/schemas/gamesession.interface'
import GameRoomLobby from './GameRoomPages/GameRoomLobby';
// { name, image, isHost }

const GameRoom : React.FC<GameSession> = (gameSession) => {
    
    return (
        <GameRoomLobby gameSession={gameSession} display='flex' />
    )
}
export default GameRoom;