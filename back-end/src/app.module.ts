/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GameCreationService } from './services/gameSessionCreation.service';
import { GameSessionController } from './controllers/gameSession.controller';
import * as dotenv from 'dotenv';
import { GameSessionSchema } from './schemas/gamesession.schema';
dotenv.config();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MongoDB_URI),
    MongooseModule.forFeature([{ name: 'GameSession', schema: GameSessionSchema}])
  ],
  controllers: [GameSessionController],
  providers: [GameCreationService],
})
export class AppModule {}
