import { Checkbox, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Toolbar } from '@material-ui/core';
import React, { Fragment } from 'react'
import { useStompContext } from './StompContext'
import SubscriptionForm from './SubscriptionForm';
import RemoveIcon from '@material-ui/icons/RemoveCircleOutline';

const SubscriptionListView = () => {

    const { state: { subscriptions }, toggleSubscription, removeSubscription } = useStompContext();

    const toggleSubscriptionHandler = (destination: string) => () => {
        toggleSubscription(destination);
    }

    const removeSubscriptionHandler = (destination: string) => () => {
        removeSubscription(destination);
    }

    return (
        <Fragment>
            <Toolbar disableGutters>
                <SubscriptionForm />
            </Toolbar>
            <List>
                {Object.entries(subscriptions).map(([destination, subscription]) => (
                    <ListItem key={destination} disableGutters>
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={subscription.enabled}
                                disableRipple
                                color="primary"
                                onClick={toggleSubscriptionHandler(destination)}
                            />
                        </ListItemIcon>
                        <ListItemText primary={destination} />
                        <ListItemSecondaryAction>
                            <IconButton
                                edge="end"
                                size="small"
                                color="secondary"
                                onClick={removeSubscriptionHandler(destination)}
                            >
                                <RemoveIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Fragment>
    )
}

export default SubscriptionListView
