import { GameSession } from '../../../../back-end/src/schemas/gamesession.interface'

interface GameRoomPageProps {
    gameSession: GameSession,
    display: string
}

export default GameRoomPageProps;