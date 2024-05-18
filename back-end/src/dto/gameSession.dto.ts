/* eslint-disable prettier/prettier */
class PlayerDto {
    name: string;
    image: string;
}
export class GameSessionDto {
    roomCode: string;
    players: PlayerDto[];
    roundTime: number;
    roundAmount: number;
}