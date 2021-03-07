import { createMuiTheme } from "@material-ui/core";
import { blue, grey } from "@material-ui/core/colors";

const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: blue[700],
            contrastText: "#ffffff"
        },
    },
    overrides: {
        MuiCardHeader: {
            root: {
                paddingBottom: 0
            }
        },
        MuiButton: {
            root: {
                height: "100%"
            },
            label: {
                textTransform: "none"
            }
        },
        MuiCssBaseline: {
            "@global": {
                "::-webkit-scrollbar": {
                    width: "8px",
                },
                "::-webkit-scrollbar-track": {
                    background: "transparent",
                },
                "::-webkit-scrollbar-thumb": {
                    background: "rgba(0, 0, 0, 0.2)",
                    borderRadius: "4px",
                },
                "body": {
                    backgroundColor: grey["A400"]
                }
            },
        }
    }
});

export default theme;