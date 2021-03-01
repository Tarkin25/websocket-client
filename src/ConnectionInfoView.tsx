import { Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useStompContext } from "./StompContext";

const ConnectionInfoView = () => {
    const {
        state: {
            connection: { url, type },
        },
        disconnect,
    } = useStompContext();

    return (
        <Grid container spacing={2} direction="column">
            <Grid item>
                <Typography variant="h5">Connection</Typography>
            </Grid>
            <Grid item>
                <Typography>{`${type} (STOMP)`}</Typography>
            </Grid>
            <Grid item>
                <Typography>{url}</Typography>
            </Grid>
            <Grid item>
                <Button variant="outlined" size="small" onClick={disconnect}>
                    Disconnect
                </Button>
            </Grid>
        </Grid>
    );
};

export default ConnectionInfoView;
