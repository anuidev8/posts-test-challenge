import { createTheme } from "@mui/material";
import { blue, red } from "@mui/material/colors";


export const blueTheme = createTheme({
    palette:{
        mode:'dark',
        primary:{
            main:'#03adfc',
            light:blue[50]
        },
        secondary:{
            main:'#0e4e73'
        },
        error:{
            main:red.A400
        },
        
    }
}) 