/* eslint-disable prettier/prettier */
class PlayerDto {
    name: string;
    image: string;
    score: number;
    ready: boolean;
    isHost: boolean;
}

class GameStateDto {
    paused: boolean;
    lobbyPhase: boolean;
    gamePhase: boolean;
    roundEndPhase: boolean;
    gameEndPhase: boolean;
}
export class GameSessionDto {
    roomCode: string;
    players: PlayerDto[];
    roundTime: number;
    roundAmount: number;
    currentRound: number;
    gameState: GameStateDto;
}