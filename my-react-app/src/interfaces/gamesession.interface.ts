import { Player } from "./player.interface";
import { GameState } from "./gameState.interface";
export interface GameSession {
    roomCode: string;
    players: Player[];
    roundTime: number;
    roundAmount: number;
    currentRound: number;
    gameState: GameState;
}