const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const RoomCodeGenerator = () : string => {
    let roomCode : string = '';
    for(let i=0; i<4; i++){
        roomCode += letters[Math.floor(Math.random() * letters.length)];
    }
    return roomCode;
}
export default RoomCodeGenerator;