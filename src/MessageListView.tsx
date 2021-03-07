import {
    Button,
    Divider,
    Grid,
    List,
    ListItem,
    makeStyles,
    Toolbar,
    Typography,
} from "@material-ui/core";
import { format } from "date-fns";
import React, { Fragment, useEffect, useRef } from "react";
import { useStompContext } from "./StompContext";

const formatBody = (body: string): string => {
    try {
        return JSON.stringify(JSON.parse(body), null, 4);
    } catch (e) {
        return body;
    }
};

const formatDate = (date: Date): string => format(date, "HH:mm:ss");

const useStyle = makeStyles(theme => ({
    list: {
        overflowY: "auto",
        height: "calc(100% - 64px)"
    }
}), { name: "MessageListView" });

const MessageListView = () => {
    
    const { state: { messages }, clearMessages } = useStompContext();
    const classes = useStyle();
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages.length]);

    return (
        <Fragment>
            <Toolbar disableGutters>
                <Button variant="outlined" onClick={clearMessages} size="small">
                    Clear
                </Button>
            </Toolbar>
            <List className={classes.list}>
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
                                            <Grid item xs={3}>
                                                <code>
                                                    {name + ":"}
                                                </code>
                                            </Grid>
                                            <Grid item xs={9}>
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
                <div ref={scrollRef} />
            </List>
        </Fragment>
    );
};

export default MessageListView;
