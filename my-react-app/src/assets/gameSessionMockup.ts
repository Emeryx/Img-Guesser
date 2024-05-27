import RandomIconGenerator from './RandomIconGenerator';
const gameSessionMockup = {
  roomCode: 'ABCD',
  players: [
    {
      uid: 'awoo',
      name: 'Emery',
      image: RandomIconGenerator(),
      isHost: true,
      score: 0,
      ready: false,
    },
    {
      
      name: 'Rando',
      image: RandomIconGenerator(),
      isHost: false,
      score: 0,
      ready: false,
    },
    {
      
      name: 'Awoo',
      image: RandomIconGenerator(),
      isHost: false,
      score: 0,
      ready: false,
    },
    {
      
      name: 'One two',
      image: RandomIconGenerator(),
      isHost: false,
      score: 0,
      ready: false,
    },
    {
      
      name: 'Bahaha',
      image: RandomIconGenerator(),
      isHost: false,
      score: 0,
      ready: false,
    },
    {
      
      name: 'Slava Ukraini',
      image: RandomIconGenerator(),
      isHost: false,
      score: 0,
      ready: false,
    },
    {
      
      name: 'I got political there',
      image: RandomIconGenerator(),
      isHost: false,
      score: 0,
      ready: false,
    },
    {
      
      name: 'Lol',
      image: RandomIconGenerator(),
      isHost: false,
      score: 0,
      ready: false,
    },
  ],
  roundTime: 45,
  roundAmount: 6,
  currentRound: 0,
  gameState: {
    paused: true,
    lobbyPhase: true,
    gamePhase: false,
    roundEndPhase: false,
    gameEndPhase: false
  }
}
export default gameSessionMockup;