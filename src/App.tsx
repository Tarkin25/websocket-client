import {
    Checkbox,
    Container,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Toolbar,
    Typography,
} from "@material-ui/core";
import React, { useEffect, useReducer, useRef } from "react";
import SockJS from "sockjs-client";
import Stomp, { Client } from "stompjs";
import ConnectionForm from "./ConnectionForm";
import reducer, { State, Subscription } from "./reducer";
import Actions from "./state/actions";
import SubscriptionForm from "./SubscriptionForm";
import RemoveIcon from "@material-ui/icons/RemoveCircleOutline";
import MessageList from "./MessageList";

const initialState: State = {
    connection: {
        url: "",
        connected: false,
    },
    subscriptions: {},
    messages: [],
};

const App = () => {
    const client = useRef<Client>();
    const [{ connection, subscriptions, messages }, dispatch] = useReducer(
        reducer,
        initialState
    );

    const connect = (url: string) => {
        const socket = new SockJS(url);
        client.current = Stomp.over(socket);

        client.current.debug = console.debug;

        client.current.connect(
            {},
            () => {
                dispatch(Actions.connected(url));
            },
            () => {
                dispatch(Actions.disconnected());
            }
        );
    };

    const addSubscription = (destination: string) => {
        const subscription = client.current!.subscribe(
            destination,
            (message) => {
                dispatch(Actions.messageReceived(message));
            }
        );

        dispatch(Actions.subscriptionAdded(destination, subscription));
    };

    const toggleSubscriptionEnabled = (destination: string, subscription: Subscription) => {
        if(subscription.enabled) {
          return () => {
            subscription.unsubscribe();
            dispatch(Actions.subscriptionDisabled(destination));
          }
        } else {
          return () => {
            const subscription = client.current!.subscribe(
              destination,
              (message) => {
                dispatch(Actions.messageReceived(message));
              }
            );

            dispatch(Actions.subscriptionEnabled(destination, subscription));
          }
        }
    }

    useEffect(() => {
        connect("http://localhost:8080/ws");
    }, []);

    useEffect(() => {
        if (connection.connected) {
            addSubscription("/queue/events");
        }

        return () => {
            if (connection.connected) {
                client.current?.disconnect(() => {
                    console.log("implicitly disconnected");
                    dispatch(Actions.disconnected());
                });
            }
        };
    }, [connection.connected]);

    return (
        <Container>
            {connection.connected ? (
                <Grid container spacing={2}>
                    <Grid item>
                        <Toolbar>
                            <Typography variant="h5">Subscriptions</Typography>
                        </Toolbar>
                        <List>
                            <ListItem disableGutters>
                                <SubscriptionForm onSubmit={addSubscription} />
                            </ListItem>
                            {Object.entries(subscriptions).map(
                                ([destination, subscription]) => (
                                    <ListItem key={destination} disableGutters>
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={subscription.enabled}
                                                disableRipple
                                                color="primary"
                                                onClick={toggleSubscriptionEnabled(destination, subscription)}
                                            />
                                        </ListItemIcon>
                                        <ListItemText primary={destination} />
                                        <ListItemSecondaryAction>
                                            <IconButton
                                                edge="end"
                                                size="small"
                                                color="secondary"
                                            >
                                                <RemoveIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                )
                            )}
                        </List>
                    </Grid>
                    <Grid item xs>
                        <MessageList messages={messages} dispatch={dispatch} />
                    </Grid>
                </Grid>
            ) : (
                <ConnectionForm onSubmit={connect} />
            )}
        </Container>
    );
};

export default App;
