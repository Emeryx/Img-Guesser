/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from "@nestjs/common";
import { GameCreationService } from "src/services/gameSessionCreation.service";
import { GameSessionDto } from "src/dto/gameSession.dto";
@Controller('game-sessions')
export class GameSessionController {
    
    constructor(private readonly gameCreationService: GameCreationService) {}

    @Post('create') // A POST request to localhost:3000/game-sessions/create triggers this operation 
    // The @Body() decorator allows to extract data from the body of an incoming HTTP request
    async createGameSession (@Body() gameSessionDto: GameSessionDto) {
        const {roomCode, players, roundTime, roundAmount, currentRound, gameState} = gameSessionDto;
        return this.gameCreationService.createGameSession(roomCode, players, roundTime, roundAmount, currentRound, gameState);
    }
}