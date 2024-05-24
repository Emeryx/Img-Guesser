/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { GameSession } from "src/schemas/gamesession.schema";
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class JoinGameSessionService {
    constructor(@InjectModel('GameSession') private gameSessionModel: Model<GameSession>) {} // The constructor is used to inject the mongoDB model
    async joinGameSession(inputtedRoomCode: string, inputtedPlayerDisplayName: string, randomImage: string): Promise<GameSession> {
        try{
            return this.gameSessionModel.findOneAndUpdate(
                {roomCode: inputtedRoomCode},
                { $push: {
                    players: {
                        uid: uuidv4(),
                        name: inputtedPlayerDisplayName,
                        image: randomImage,
                        score: 0,
                        ready: false,
                        isHost: false
                    }
                } }
            )
        }
        catch(error){
            console.error(error);
        }
    }
}