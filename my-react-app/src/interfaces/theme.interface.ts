// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Palette } from "@mui/joy/styles"
declare module '@mui/joy/styles' {
    interface Palette {
      custom: {
        primary: string,
        secondary: string,
        background: string,
        accent: string,
        error: string
      };
    }
}