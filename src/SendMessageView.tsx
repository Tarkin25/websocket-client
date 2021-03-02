import { Button, Grid, Typography } from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import JsonEditor from "./components/JsonEditor/JsonEditor";
import TextField from "./components/TextField";
import { useStompContext } from "./StompContext";

type Values = {
    destination: string;
    body: string;
};

const initialValues: Values = {
    destination: "",
    body: "",
};

const SendMessageView = () => {
    const { send } = useStompContext();

    const handleSubmit = (values: Values) => {
        send(values.destination, {}, values.body);
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="flex-end" component={Form}>
                <Grid item xs={12}>
                    <Typography variant="h5">Send Message</Typography>
                </Grid>
                <Grid item xs>
                    <TextField tabIndex={0} name="destination" label="Destination" />
                </Grid>
                <Grid item>
                    <Button tabIndex={2} variant="outlined" color="primary" fullWidth type="submit" size="small">
                        Send
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <JsonEditor tabIndex={1} name="body" label="Body" variant="outlined" />
                </Grid>
            </Grid>
        </Formik>
    );
};

export default SendMessageView;
