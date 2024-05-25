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
            return this.gameSessionModel.findOne({roomCode});
        }
        catch(error){
            console.error(error);
        }
    }
}