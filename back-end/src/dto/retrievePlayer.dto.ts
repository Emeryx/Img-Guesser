/* eslint-disable prettier/prettier */
import { GameSession } from "src/schemas/gamesession.interface";
export class RetrievePlayerDto {
    uid: string;
    gameSession: GameSession;
}