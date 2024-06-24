import { Box, Stack, Typography } from "@mui/joy";
import GameRoomPageProps from "./GameRoomPageProps.interface";
import coyote from '../../assets/question_images/Coyote.webp'
import styles from "../../assets/MuiStyles";
const {subheaderFontSize} = styles;
const GameRoomRound: React.FC<GameRoomPageProps> = ({ gameSession, player, display, isGameDataLoading, isPlayerHost }) => {
    return (
        <Stack direction='column' justifyContent='center' alignItems='center' spacing={4} sx={{mt: 4}}>
            {/* <Typography>-- GAME ROUND --</Typography> */}
            <Typography level='h3' fontSize={subheaderFontSize} textColor='custom.primary'>Guess what this is!</Typography>
            <Box height={{ xs: 400 ,md: 500, lg: 500 }} width={{ md: '100%', lg: 1000, xl: 1400 }}>
                <img src={coyote} width='100%' height='100%' style={{objectFit: 'cover'}} />
            </Box>
        </Stack>
    )
}

export default GameRoomRound;