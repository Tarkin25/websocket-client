import { makeStyles } from "@material-ui/core";
import React from "react";
import Tile from "./components/Tile";
import ConnectionForm from "./ConnectionForm";
import ConnectionInfoView from "./ConnectionInfoView";
import MessageListView from "./MessageListView";
import SendMessageView from "./SendMessageView";
import { useStompContext } from "./StompContext";
import SubscriptionListView from "./SubscriptionListView";
import clsx from 'clsx';

const useStyle = makeStyles(
    (theme) => ({
        root: {
            padding: theme.spacing(2),
            height: "100vh"
        },
        container: {
            display: "grid",
            columnCount: 12,
            gridAutoColumns: "2fr 4fr 3fr",
            gridTemplateAreas: "'connection sendMessage messages' " +
                               "'subscriptions sendMessage messages' ",
            gridAutoRows: "1fr 3fr",
            gap: theme.spacing(2),
            height: "100%"
        },
        item: {
            width: "100%"
        },
        connection: {
            gridArea: "connection"
        },
        sendMessage: {
            gridArea: "sendMessage"
        },
        messages: {
            gridArea: "messages"
        },
        messagesCardContent: {
            height: "100%"
        },
        subscriptions: {
            gridArea: "subscriptions"
        }
    }),
    { name: "App" }
);

const App = () => {
    const classes = useStyle();

    const {
        state: { connection },
    } = useStompContext();

    return (
        <main className={classes.root}>
            {connection.connected ? (
                <div className={classes.container}>
                    <Tile className={clsx(classes.item, classes.connection)} title="Connection">
                        <ConnectionInfoView />
                    </Tile>
                    <Tile className={clsx(classes.item, classes.sendMessage)} title="Send Message">
                        <SendMessageView />
                    </Tile>
                    <Tile className={clsx(classes.item, classes.messages)} title="Messages">
                        <MessageListView />
                    </Tile>
                    <Tile className={clsx(classes.item, classes.subscriptions)} title="Subscriptions">
                        <SubscriptionListView />
                    </Tile>
                </div>
            ) : (
                <ConnectionForm />
            )}
        </main>
    );
};

export default App;
