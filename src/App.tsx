import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import ConnectionForm from "./ConnectionForm";
import ConnectionInfoView from "./ConnectionInfoView";
import MessageListView from "./MessageListView";
import SendMessageView from "./SendMessageView";
import { useStompContext } from "./StompContext";
import SubscriptionListView from "./SubscriptionListView";

const useStyle = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2)
    }
}), { name: "App" });

const App = () => {

    const classes = useStyle();

    const {
        state: { connection },
    } = useStompContext();

    return (
        <main className={classes.root}>
            {connection.connected ? (
                <Grid container spacing={2}>
                    <Grid item lg={3} container spacing={2} direction="column">
                        <Grid item>
                            <ConnectionInfoView />
                        </Grid>
                        <Grid item>
                            <SubscriptionListView />
                        </Grid>
                    </Grid>
                    <Grid item lg={5}>
                            <SendMessageView />
                        </Grid>
                    <Grid item lg={4}>
                        <MessageListView />
                    </Grid>
                </Grid>
            ) : (
                <ConnectionForm />
            )}
        </main>
    );
};

export default App;
