import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { FC } from "react"

import { ThemeProps } from './types'
//THEME
import { blueTheme } from "./blueTheme"




export const AppTheme: FC<ThemeProps> = ({children}) =>{
    return(
        <ThemeProvider theme={ blueTheme }>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}
