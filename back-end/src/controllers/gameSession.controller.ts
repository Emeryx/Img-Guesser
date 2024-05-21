/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Query } from "@nestjs/common";
import { GameCreationService } from "src/services/gameSessionCreation.service";
import { GameSessionDto } from "src/dto/gameSession.dto";
import { RetrieveGameSessionsService } from "src/services/retrieveGameSessions.service";
import { RetrieveOneGameSessionService } from "src/services/retrieveOneGameSession.service";
import { GameSession } from "src/schemas/gamesession.schema";
@Controller('game-sessions')
export class GameSessionController {
    
    constructor(private readonly gameCreationService: GameCreationService,
        private readonly retrieveGameSessionsService: RetrieveGameSessionsService,
        private readonly retrieveOneGameSessionService: RetrieveOneGameSessionService
    ) {}

    @Post('create') // A POST request to localhost:3000/game-sessions/create triggers this operation 
    // The @Body() decorator allows to extract data from the body of an incoming HTTP request
    async createGameSession (@Body() gameSessionDto: GameSessionDto) {
        const {roomCode, players, roundTime, roundAmount, currentRound, gameState} = gameSessionDto;
        return this.gameCreationService.createGameSession(roomCode, players, roundTime, roundAmount, currentRound, gameState);
    }

    @Get('retrieve-all')
    async retrieveGameSessions () {
        return this.retrieveGameSessionsService.retrieveGameSessions();
    }

    @Get('retrieve-one')
    async retrieveOneGameSession (@Query('inputtedRoomCode') inputtedRoomCode: string) : Promise<GameSession> {
        return this.retrieveOneGameSessionService.retrieveOneGameSession(inputtedRoomCode);
    }

}