/* eslint-disable prettier/prettier */
// paused: boolean;
// lobbyPhase: boolean;
// gamePhase: boolean;
// roundEndPhase: boolean;
// gameEndPhase: boolean;

/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
export type GameSessionDocument = HydratedDocument<GameState>;

@Schema()
export class GameState {

    @Prop({ required: true })
    paused: boolean;

    @Prop({ required: true })
    lobbyPhase: boolean;

    @Prop({ required: true })
    gamePhase: boolean; 

    @Prop({ required: true })
    roundEndPhase: boolean; 

    @Prop({ required: true })
    gameEndPhase: boolean; 

}

export const GameSessionSchema = SchemaFactory.createForClass(GameState);