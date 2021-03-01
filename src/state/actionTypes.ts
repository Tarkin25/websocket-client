import { Message, Subscription } from "stompjs";
import { ConnectionType } from "./reducer";

export const CONNECTED = "CONNECTED";
export const DISCONNECTED = "DISCONNECTED";
export const SUBSCRIPTION_ADDED = "SUBSCRIPTION_ADDED";
export const SUBSCRIPTION_DISABLED = "SUBSCRIPTION_DISABLED";
export const SUBSCRIPTION_ENABLED = "SUBSCRIPTION_ENABLED";
export const SUBSCRIPTION_REMOVED = "SUBSCRIPTION_REMOVED";
export const MESSAGE_RECEIVED = "MESSAGE_RECEIVED";
export const MESSAGES_CLEARED = "MESSAGES_CLEARED";

type Connected = {
    type: typeof CONNECTED;
    url: string;
    connectionType: ConnectionType;
}

type Disconnected = {
    type: typeof DISCONNECTED;
}

type SubscriptionAdded = {
    type: typeof SUBSCRIPTION_ADDED;
    destination: string;
    subscription: Subscription;
}

type SubscriptionDisabled = {
    type: typeof SUBSCRIPTION_DISABLED;
    destination: string;
}

type SubscriptionEnabled = {
    type: typeof SUBSCRIPTION_ENABLED;
    destination: string;
    subscription: Subscription;
}

type SubscriptionRemoved = {
    type: typeof SUBSCRIPTION_REMOVED;
    destination: string;
}

type MessageReceived = {
    type: typeof MESSAGE_RECEIVED;
    message: Message;
    timestamp: Date;
}

type MessagesCleared = {
    type: typeof MESSAGES_CLEARED;
}

type Action = Connected | Disconnected | SubscriptionAdded | SubscriptionDisabled | SubscriptionEnabled | SubscriptionRemoved | MessageReceived | MessagesCleared;

export default Action;