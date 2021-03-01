import { CssBaseline, ThemeProvider } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import theme from "./resources/theme";
import { StompContextProvider } from "./StompContext";

ReactDOM.render(
    <React.StrictMode>
        <StompContextProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </StompContextProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
