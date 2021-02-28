import { Button, Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react'

export type SubscriptionFormProps = {
    onSubmit: (destination: string) => void;
}

const SubscriptionForm = (props: SubscriptionFormProps) => {

    const { onSubmit } = props;
    const [destination, setDestination] = useState("");

    const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDestination(e.target.value);
    }

    const handleSubmit = () => {
        onSubmit(destination);
        setDestination("");
    }

    return (
        <Grid container spacing={2} alignItems="flex-end">
            <Grid item>
                <TextField label="Destination" name="destination" value={destination} onChange={handleDestinationChange} />
            </Grid>
            <Grid item>
                <Button variant="outlined" color="primary" onClick={handleSubmit}>
                    Subscribe
                </Button>
            </Grid>
        </Grid>
    )
}

export default SubscriptionForm
