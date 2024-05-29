/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { GameSession } from "src/schemas/gamesession.schema";
// import { Player } from "src/schemas/player.interface";
// import { GameState } from "src/schemas/gamestate.interface";

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
function RoomCodeGenerator() {
    let roomCode : string = '';
    for(let i=0; i<4; i++){
        roomCode += letters[Math.floor(Math.random() * letters.length)];
    }
    return roomCode;
}

@Injectable()
export class GameCreationService {
    constructor(@InjectModel('GameSession') private gameSessionModel: Model<GameSession>) {} // The constructor is used to inject the mongoDB model
    async createGameSession(hostName: string, hostImage: string, roundTime: number, roundAmount: number, hostUid: string): Promise<GameSession> { // The type Promise<GameSession> means that the method returns a promise that then resolves into a GameSession object. The use of an asynchronous function allows to do stuff in the mongoDB and catch potential errors easily
        const newGameSession = new this.gameSessionModel({
            roomCode: RoomCodeGenerator(),
                players: [{uid: hostUid, name: hostName, image: hostImage, score: 0, ready: false, isHost: true}],
                roundTime: roundTime,
                roundAmount: roundAmount,
                currentRound: 0,
                gameState: {
                    paused: true,
                    lobbyPhase: true,
                    gamePhase: false,
                    roundEndPhase: false,
                    gameEndPhase: false
                }
        });
        try {
            return await newGameSession.save();
        }
        catch (error) {
            console.error(error);
        }
    }
}
