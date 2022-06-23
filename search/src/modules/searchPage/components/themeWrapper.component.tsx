import React from "react";
import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: 'rgb(44, 102, 147)',
        },
        success:{
            main: `#5da271`
        }
    },
});

export function ThemeWrapper({children}:{children:any}) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}