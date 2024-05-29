/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { GameSession } from "src/schemas/gamesession.interface";
import { Player } from "src/schemas/player.interface";

@Injectable()
export class RetrievePlayerService {
    async getPlayer (uid: string, gameSession: GameSession): Promise<Player> {
        const {players} = gameSession;
        let playerObj: Player = null;
        for(const player of players) {
            if(player.uid === uid) {
                playerObj=player;
            }
        }
        return playerObj;
    }
}