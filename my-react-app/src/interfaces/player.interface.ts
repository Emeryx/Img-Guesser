export interface Player {
    uid?: string; // Optional on front end, Must in back end
    name: string;
    image: string;
    score: number;
    ready: boolean;
    isHost: boolean;
}