/* eslint-disable prettier/prettier */
// class PlayerDto {
//     name: string;
//     image: string;
//     score: number;
//     ready: boolean;
//     isHost: boolean;
// }

// class GameStateDto {
//     paused: boolean;
//     lobbyPhase: boolean;
//     gamePhase: boolean;
//     roundEndPhase: boolean;
//     gameEndPhase: boolean;
// }
export class GameSessionDto {
    hostName: string;
    hostImage: string;
    roundTime: number;
    roundAmount: number;
    hostUid: string;
}