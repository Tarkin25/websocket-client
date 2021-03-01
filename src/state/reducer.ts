import {
    Subscription as StompSubscription,
    Message as StompMessage,
} from "stompjs";
import Action, {
    CONNECTED,
    DISCONNECTED,
    MESSAGES_CLEARED,
    MESSAGE_RECEIVED,
    SUBSCRIPTION_ADDED,
    SUBSCRIPTION_DISABLED,
    SUBSCRIPTION_ENABLED,
    SUBSCRIPTION_REMOVED,
} from "./actionTypes";

export type Subscription = StompSubscription & {
    enabled: boolean;
};

export type Message = StompMessage & {
    timestamp: Date;
};

export enum ConnectionType {
    WEBSOCKET = "WebSocket",
    SOCKJS = "SockJS",
}

export type State = {
    connection: {
        connected: boolean;
        url: string | null;
        type: ConnectionType | null;
    };
    subscriptions: {
        [destination: string]: Subscription;
    };
    messages: Message[];
};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case CONNECTED: {
            return {
                connection: {
                    url: action.url,
                    connected: true,
                    type: action.connectionType,
                },
                subscriptions: {},
                messages: [],
            };
        }
        case DISCONNECTED: {
            return {
                connection: {
                    connected: false,
                    url: null,
                    type: null,
                },
                subscriptions: {},
                messages: [],
            };
        }
        case SUBSCRIPTION_ADDED: {
            let subscriptions = { ...state.subscriptions };

            subscriptions[action.destination] = {
                ...action.subscription,
                enabled: true,
            };

            return {
                ...state,
                subscriptions,
            };
        }
        case SUBSCRIPTION_DISABLED: {
            let subscriptions = { ...state.subscriptions };

            const subscription = subscriptions[action.destination];

            subscriptions[action.destination] = {
                ...subscription,
                enabled: false,
            };

            return {
                ...state,
                subscriptions,
            };
        }
        case SUBSCRIPTION_ENABLED: {
            let subscriptions = { ...state.subscriptions };

            subscriptions[action.destination] = {
                ...action.subscription,
                enabled: true,
            };

            return {
                ...state,
                subscriptions,
            };
        }
        case SUBSCRIPTION_REMOVED: {
            let subscriptions = { ...state.subscriptions };

            delete subscriptions[action.destination];

            return {
                ...state,
                subscriptions,
            };
        }
        case MESSAGE_RECEIVED: {
            const message = {
                ...action.message,
                timestamp: action.timestamp,
            };

            const messages = [...state.messages, message];

            return {
                ...state,
                messages,
            };
        }
        case MESSAGES_CLEARED: {
            return {
                ...state,
                messages: [],
            };
        }
        default:
            return state;
    }
};

export default reducer;
