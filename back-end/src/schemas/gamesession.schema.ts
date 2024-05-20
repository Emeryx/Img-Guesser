/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
export type GameSessionDocument = HydratedDocument<GameSession>;
import { Player } from './player.interface';
// import { GameState } from './gamestate.interface';
import { GameState } from './gamestate.schema';
@Schema()
export class GameSession {

    @Prop({ required: true })
    roomCode: string;

    @Prop({ required: true })
    players: Player[]; // 2-8

    @Prop({ required: true })
    roundTime: number; // In seconds (15-75)

    @Prop({ required: true })
    roundAmount: number; // (3-12)

    @Prop({ required: true })
    currentRound: number; // (0 when in lobby, 1-3 / 1-12 when ingame)

    @Prop({ required: true })
    gameState: GameState;
}

export const GameSessionSchema = SchemaFactory.createForClass(GameSession);