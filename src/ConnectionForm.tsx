import { Button, Grid, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react'

export type ConnectionFormProps = {
    onSubmit: (url: string) => void;
}

const urlKey = "WS_CLIENT_URL";

const ConnectionForm = (props: ConnectionFormProps) => {

    const { onSubmit } = props;

    const [url, setUrl] = useState(localStorage.getItem(urlKey) || "");

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(url);
        localStorage.setItem(urlKey, url);
    }

    return (
        <Grid container spacing={2} component="form" onSubmit={handleSubmit}>
            <Grid item xs={12}>
                <Typography variant="h5">Connect to a STOMP Websocket Server</Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField name="url" label="URL" value={url} onChange={handleUrlChange} placeholder="http://localhost:8080/ws" />
            </Grid>
            <Grid item>
                <Button color="primary" variant="contained" type="submit">
                    Connect
                </Button>
            </Grid>
        </Grid>
    )
}

export default ConnectionForm
