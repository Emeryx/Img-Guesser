/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { GameSession } from "src/schemas/gamesession.schema";
import { Player } from "src/schemas/player.interface";
@Injectable()
export class GameCreationService {
    constructor(@InjectModel('GameSession') private gameSessionModel: Model<GameSession>) {} // The constructor is used to inject the mongoDB model
    async createGameSession(roomCode: string, players: Player[], roundTime: number, roundAmount: number): Promise<GameSession> { // The type Promise<GameSession> means that the method returns a promise that then resolves into a GameSession object. The use of an asynchronous function allows to do stuff in the mongoDB and catch potential errors easily
        const newGameSession = new this.gameSessionModel({ roomCode, players, roundTime, roundAmount});
        try {
            return await newGameSession.save();
        }
        catch (error) {
            console.error(error);
        }
    }
}
