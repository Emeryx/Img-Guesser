/* eslint-disable prettier/prettier */
export interface Player {
    uid: string;
    name: string;
    image: string;
    score: number;
    ready: boolean;
    isHost: boolean;
}