/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { GameSession } from "src/schemas/gamesession.schema";
import { Model } from "mongoose";
import { Player } from "src/schemas/player.interface";

const areAllPlayersReady = (gameSession: GameSession) => {
    const {players} = gameSession;
    const isReady = (player: Player) => player.ready === true
    return players.every(isReady);
}

@Injectable()
export class GameHostFunctions {
    constructor(@InjectModel('GameSession') private gameSessionModel: Model<GameSession>) {}
    async startGame(uid: string, roomCode: string) {
        try{
            const gameSession = await this.gameSessionModel.findOne({roomCode});
            const areAllReady = areAllPlayersReady(gameSession);
            if (!areAllReady) throw new BadRequestException('Not all players are ready')
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
        catch{
            throw new BadRequestException('Not all players are ready')
        }
    }
}