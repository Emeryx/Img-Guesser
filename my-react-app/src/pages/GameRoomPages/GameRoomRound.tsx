import { Stack, Typography } from "@mui/joy";
import GameRoomPageProps from "./GameRoomPageProps.interface";

const GameRoomRound: React.FC<GameRoomPageProps> = ({ gameSession, player, display, isGameDataLoading, isPlayerHost }) => {
    return (
        <Stack>
            <Typography>-- GAME ROUND --</Typography>
        </Stack>
    )
}

export default GameRoomRound;