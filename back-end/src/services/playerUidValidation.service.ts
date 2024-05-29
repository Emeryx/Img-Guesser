/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { GameSession } from "src/schemas/gamesession.interface";
@Injectable()
export class PlayerUidValidation{
    constructor() {}
    async isReconnecting (uid: string, gameSession: GameSession): Promise<boolean> {
        const {players} = gameSession;
        let isReconnecting = false;
        for(const player of players) {
            if(player.uid === uid) {
                isReconnecting = true;
                break;
            }
        }
        return isReconnecting;
    }
}