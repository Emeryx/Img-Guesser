/* eslint-disable prettier/prettier */
import { Player } from "./player.interface";
import { GameState } from "./gamestate.interface";
export interface GameSession {
    roomCode: string;
    players: Player[];
    roundTime: number;
    roundAmount: number;
    currentRound: number;
    gameState: GameState;
}