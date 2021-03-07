import { Button, Grid } from "@material-ui/core";
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
    destination: "/queue/commands",
    body: "{\n\t\"hello\": \"world\"\n}",
};

const SendMessageView = () => {
    const { send } = useStompContext();

    const handleSubmit = (values: Values) => {
        send(values.destination, {}, values.body);
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Grid container spacing={1} component={Form} alignItems="stretch">
                <Grid item xs>
                    <TextField tabIndex={0} variant="outlined" name="destination" label="Destination" />
                </Grid>
                <Grid item>
                    <Button tabIndex={2} variant="contained" color="primary" fullWidth type="submit">
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
