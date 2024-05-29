/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GameCreationService } from './services/gameSessionCreation.service';
import { GameSessionController } from './controllers/gameSession.controller';
import * as dotenv from 'dotenv';
import { GameSessionSchema } from './schemas/gamesession.schema';
import { RetrieveGameSessionsService } from './services/retrieveGameSessions.service';
import { RetrieveOneGameSessionService } from './services/retrieveOneGameSession.service';
import { JoinGameSessionService } from './services/joinGameSession.service';
import { PlayerNameValidationService } from './services/playerNameValidation.service';
import { PlayerSocketGateway } from './gateways/player.gateway';
import { PlayerUidValidation } from './services/playerUidValidation.service';
import { RetrievePlayerService } from './services/retrievePlayer.service';
dotenv.config();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MongoDB_URI),
    MongooseModule.forFeature([
      { name: 'GameSession', schema: GameSessionSchema },
    ]),
  ],
  controllers: [GameSessionController],
  providers: [
    GameCreationService,
    RetrieveGameSessionsService,
    RetrieveOneGameSessionService,
    JoinGameSessionService,
    PlayerNameValidationService,
    PlayerUidValidation,
    RetrievePlayerService,
    PlayerSocketGateway
  ],
})
export class AppModule {}
