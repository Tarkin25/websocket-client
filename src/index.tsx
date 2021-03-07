import { CssBaseline, ThemeProvider } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import theme from "./resources/theme";
import { StompContextProvider } from "./StompContext";
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <StompContextProvider>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <App />
                </ThemeProvider>
            </StompContextProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
