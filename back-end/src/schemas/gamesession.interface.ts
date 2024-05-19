/* eslint-disable prettier/prettier */
import { Player } from "./player.interface";
export interface GameSession {
    roomCode: string;
    players: Player[];
    roundTime: number;
    roundAmount: number;
}