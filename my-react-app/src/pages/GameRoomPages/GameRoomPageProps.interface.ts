import { GameSession } from "../../interfaces/gamesession.interface";
import { Player } from "../../interfaces/player.interface";
interface GameRoomPageProps {
    gameSession: GameSession,
    player: Player,
    display: string,
    isGameDataLoading: boolean,
    isPlayerHost: boolean | 'loading',
}

export default GameRoomPageProps;