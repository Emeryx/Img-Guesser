/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { GameSession } from "src/schemas/gamesession.schema";
@Injectable()
export class LeaveGameSessionService {
    constructor(@InjectModel('GameSession') private gameSessionModel: Model<GameSession>) {} // The constructor is used to inject the mongoDB model
    async leaveGameSession(uid: string, roomCode: string): Promise<void> {
        try{
            const gameSession = await this.gameSessionModel.findOne({roomCode});
            const players = gameSession.players;
            let foundPlayerIndex : number = -1;
            players.forEach((player, index) => {
                if(player.uid === uid){
                    foundPlayerIndex = index;
                }
            })
            if(foundPlayerIndex !== -1){
                players.splice(foundPlayerIndex, 1);
                await gameSession.updateOne(
                    {$set: {players}}
                )
                await gameSession.save();
            }
        }
        catch(error){
            console.error(error);
        }
    }
}