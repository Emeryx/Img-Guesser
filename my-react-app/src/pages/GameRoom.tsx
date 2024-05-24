// import { Player } from '../../../back-end/src/schemas/player.interface'
import { GameSession } from '../../../back-end/src/schemas/gamesession.interface'
import GameRoomLobby from './GameRoomPages/GameRoomLobby';
import { useParams } from 'react-router-dom';
// { name, image, isHost }

const GameRoom: React.FC<GameSession> = (gameSession) => {
    return (
        <GameRoomLobby gameSession={gameSession} display={gameSession.gameState.lobbyPhase ? 'flex' : 'none'} />
    )
}
export default GameRoom;