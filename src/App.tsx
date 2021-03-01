import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import ConnectionForm from "./ConnectionForm";
import ConnectionInfoView from "./ConnectionInfoView";
import MessageListView from "./MessageListView";
import SendMessageView from "./SendMessageView";
import { useStompContext } from "./StompContext";
import SubscriptionListView from "./SubscriptionListView";

const App = () => {
    const {
        state: { connection },
        addSubscription,
    } = useStompContext();

    useEffect(() => {
        if (connection.connected) {
            addSubscription("/queue/events");
        }
    }, [connection.connected, addSubscription]);

    return (
        <main>
            {connection.connected ? (
                <Grid container spacing={2}>
                    <Grid item xs={8} container spacing={2} direction="column">
                        <Grid item>
                            <ConnectionInfoView />
                        </Grid>
                        <Grid item>
                            <SubscriptionListView />
                        </Grid>
                        <Grid item>
                            <SendMessageView />
                        </Grid>
                    </Grid>
                    <Grid item xs>
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
