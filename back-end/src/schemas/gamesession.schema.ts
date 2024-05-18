/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
export type GameSessionDocument = HydratedDocument<GameSession>;

interface Player {
    name: string;
    image: string;
}

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

}

export const GameSessionSchema = SchemaFactory.createForClass(GameSession);