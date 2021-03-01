import { Button, Grid } from '@material-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';
import React from 'react'
import TextField from './components/TextField';
import { useStompContext } from './StompContext';

type Values = {
    destination: string;
}

const initialValues: Values = {
    destination: ""
}

const SubscriptionForm = () => {

    const { addSubscription } = useStompContext();

    const handleSubmit = (values: Values, helpers: FormikHelpers<Values>) => {
        addSubscription(values.destination);
        helpers.resetForm();
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            <Grid container spacing={2} alignItems="flex-end" component={Form}>
            <Grid item>
                <TextField name="destination" label="Destination" />
            </Grid>
            <Grid item>
                <Button variant="outlined" color="primary" size="small" type="submit">
                    Subscribe
                </Button>
            </Grid>
        </Grid>
        </Formik>
    )
}

export default SubscriptionForm
