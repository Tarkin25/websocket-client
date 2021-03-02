import { Message, Subscription } from "stompjs";
import { ConnectionType } from "../StompContext";
import Action, { CONNECTED, DISCONNECTED, MESSAGES_CLEARED, MESSAGE_RECEIVED, SUBSCRIPTION_ADDED, SUBSCRIPTION_DISABLED, SUBSCRIPTION_ENABLED, SUBSCRIPTION_REMOVED } from "./actionTypes";

export default class Actions {

    public static connected = (url: string, type: ConnectionType): Action => ({
        type: CONNECTED,
        url,
        connectionType: type
    })

    public static disconnected = (): Action => ({
        type: DISCONNECTED
    })

    public static subscriptionAdded = (destination: string, subscription: Subscription): Action => ({
        type: SUBSCRIPTION_ADDED,
        destination,
        subscription
    })

    public static subscriptionDisabled = (destination: string): Action => ({
        type: SUBSCRIPTION_DISABLED,
        destination
    })

    public static subscriptionEnabled = (destination: string, subscription: Subscription): Action => ({
        type: SUBSCRIPTION_ENABLED,
        destination,
        subscription
    })

    public static subscriptionRemoved = (destination: string): Action => ({
        type: SUBSCRIPTION_REMOVED,
        destination
    })

    public static messageReceived = (message: Message): Action => ({
        type: MESSAGE_RECEIVED,
        message,
        timestamp: new Date()
    })

    public static messagesCleared = (): Action => ({
        type: MESSAGES_CLEARED
    })

}