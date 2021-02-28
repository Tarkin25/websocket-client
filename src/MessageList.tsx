import {
    Button,
    Divider,
    Grid,
    List,
    ListItem,
    Toolbar,
    Typography,
} from "@material-ui/core";
import { format } from "date-fns";
import React, { Fragment } from "react";
import { Message } from "./reducer";
import Actions from "./state/actions";
import Action from "./state/actionTypes";

export type MessageListProps = {
    messages: Message[];
    dispatch: React.Dispatch<Action>;
};

const formatBody = (body: string): string => {
    try {
        return JSON.stringify(JSON.parse(body), null, 4);
    } catch (e) {
        return body;
    }
};

const formatDate = (date: Date): string => format(date, "HH:mm:ss");

const MessageList = (props: MessageListProps) => {
    const { messages, dispatch } = props;

    const handleClear = () => {
        dispatch(Actions.messagesCleared());
    }

    return (
        <Fragment>
            <Toolbar>
                <Typography variant="h5">Messages</Typography>
                <Button variant="outlined" onClick={handleClear} size="small">
                    Clear
                </Button>
            </Toolbar>
            <List>
                {messages.map((message, index) => (
                    <Fragment key={index}>
                        <ListItem>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography>
                                        {formatDate(message.timestamp)}
                                    </Typography>
                                </Grid>
                                {Object.entries(message.headers).map(
                                    ([name, value]) => (
                                        <Fragment key={name}>
                                            <Grid item xs={6}>
                                                <code>
                                                    {name + ":"}
                                                </code>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <code>
                                                    {value + ""}
                                                </code>
                                            </Grid>
                                        </Fragment>
                                    )
                                )}
                                <Grid item xs={12} />
                                <Grid item xs={12}>
                                    <pre><code>{formatBody(message.body)}</code></pre>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <Divider />
                    </Fragment>
                ))}
            </List>
        </Fragment>
    );
};

export default MessageList;
