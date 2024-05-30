/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { GameSession } from "src/schemas/gamesession.schema";
@Injectable()
export class RetrieveOneGameSessionService {
    constructor(@InjectModel('GameSession') private gameSessionModel: Model<GameSession>) {} // The constructor is used to inject the mongoDB model
    async retrieveOneGameSession(roomCode: string) : Promise<GameSession> {
        try{
            return await this.gameSessionModel.findOne({roomCode});
        }
        catch(error){
            console.error(error);
        }
    }
    async retrieveAndDeleteOneGameSession(roomCode: string){
        try{
            return await this.gameSessionModel.findOneAndDelete({roomCode});
        }
        catch(error){
            console.error(error);
        }
    }
    async retrieveAndUpdatePlayerReadyState(roomCode: string, uid: string){
        try{
            console.log('Awooooooo')
            const gameSession = await this.gameSessionModel.findOne({roomCode});
            const players = gameSession.players;
            players.forEach((player) => {
                if(player.uid === uid){
                    player.ready = !player.ready;
                }
            })
            await gameSession.updateOne(
                {$set: {players}}
            )
            await gameSession.save()
        }
        catch(error){
            console.error(error);
        }
    }
}