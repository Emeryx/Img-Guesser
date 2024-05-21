/* eslint-disable @typescript-eslint/no-unused-vars */
import { Stack, Typography, Box } from '@mui/joy'
import styles from '../assets/MuiStyles'
const { subheaderFontSize } = styles;
import { Player } from '../../../back-end/src/schemas/player.interface'
import hostIcon from './hostIcon.webp'
const PlayerContainer: React.FC<Player> = ({ name, image, isHost, score, ready }) => {
    return (
        <Box height={250} width={250}>
            <Stack direction='column' justifyContent='center' alignItems='center' spacing={2}>
                <img src={image} style={{width: '128px', height: '128px', objectFit: 'cover', borderRadius: '50%'}} />
                <Stack direction='row' justifyContent='center' alignItems='center' spacing={2}>
                    <Typography level='h3' fontSize={subheaderFontSize} >{name}</Typography>
                    <img src={hostIcon} style={{ display: isHost ? 'block' : 'none', width: '32px', height: '32px' }} /> {/* Display crown icon only if player is the owner of the game */}
                </Stack>
            </Stack>
        </Box>
    )
}
export default PlayerContainer;