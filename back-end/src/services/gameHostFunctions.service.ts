/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { GameSession } from "src/schemas/gamesession.schema";
import { Model } from "mongoose";

@Injectable()
export class GameHostFunctions {
    constructor(@InjectModel('GameSession') private gameSessionModel: Model<GameSession>) {}
    async startGame(roomCode: string) {
        const gameSession = await this.gameSessionModel.findOne({roomCode});
        const newGameState = {
            paused: false,
            lobbyPhase: false,
            gamePhase: true,
            roundEndPhase: false,
            gameEndPhase: false,
        }
        const newCurrentRound = 1
        await gameSession.updateOne({
            $set: {gameState: newGameState, currentRound: newCurrentRound}
        })
        // await gameSession.save();
    }
}