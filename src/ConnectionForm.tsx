import { Button, Grid, MenuItem, Typography } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React from 'react'
import SockJS from 'sockjs-client';
import TextField from './components/TextField';
import { ConnectionType, useStompContext } from './StompContext';

type Values = {
    url: string;
    connectionType: ConnectionType;
}

const initialValues: Values = {
    url: "",
    connectionType: ConnectionType.WEBSOCKET
}

const ConnectionForm = () => {

    const {connect} = useStompContext();

    const handleSubmit = (values: Values) => {
        const { url, connectionType } = values;
        let ws: WebSocket;

        if(connectionType === ConnectionType.WEBSOCKET) {
            ws = new WebSocket(url);
        } else {
            ws = new SockJS(url);
        }

        connect(ws, connectionType);
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            <Grid container spacing={2} component={Form}>
            <Grid item xs={12}>
                <Typography variant="h5">Connect to a STOMP Websocket Server</Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField name="connectionType" label="Type" select>
                    <MenuItem value={ConnectionType.WEBSOCKET}>
                        {ConnectionType.WEBSOCKET}
                    </MenuItem>
                    <MenuItem value={ConnectionType.SOCKJS}>
                        {ConnectionType.SOCKJS}
                    </MenuItem>
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <TextField name="url" label="URL" />
            </Grid>
            <Grid item>
                <Button color="primary" variant="contained" type="submit">
                    Connect
                </Button>
            </Grid>
        </Grid>
        </Formik>
    )
}

export default ConnectionForm
