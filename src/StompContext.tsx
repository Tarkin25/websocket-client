import React, { createContext, PropsWithChildren, useCallback, useContext, useDebugValue, useReducer, useRef } from 'react'
import Stomp, { Client } from 'stompjs';
import Actions from './state/actions';
import reducer, { ConnectionType, State } from './state/reducer';

export type StompContextValue = {
    state: State;
    connect: (ws: WebSocket, type: ConnectionType) => Promise<void>;
    disconnect: () => void;
    addSubscription: (destination: string) => void;
    toggleSubscription: (destination: string) => void;
    removeSubscription: (destination: string) => void;
    clearMessages: () => void;
    send: (destination: string, headers?: {}, body?: any) => void;
}

const initialContextValue: StompContextValue = {} as StompContextValue;

const StompContext = createContext(initialContextValue);

const initialState: State = {
    connection: {
        url: null,
        connected: false,
        type: null
    },
    subscriptions: {},
    messages: [],
};

export const useStompContext = () => {
    const context = useContext(StompContext);

    useDebugValue(context.state);

    return context;
};

export const StompContextProvider = (props: PropsWithChildren<{}>) => {

    const client = useRef<Client>();
    const [state, dispatch] = useReducer(reducer, initialState);

    const connect = useCallback((ws: WebSocket, type: ConnectionType) => new Promise<void>((resolve, reject) => {
        client.current = Stomp.over(ws);
        client.current.debug = console.debug;
        client.current.connect(
            {},
            () => {
                dispatch(Actions.connected(ws.url, type));
                resolve();
            },
            () => {
                dispatch(Actions.disconnected());
            }
        )
    }), []);

    const disconnect = useCallback(() => {
        client.current?.disconnect(() => {
            dispatch(Actions.disconnected());
        });
    }, []);

    const subscribe = useCallback((destination: string) => {
        return client.current!.subscribe(
            destination,
            message => {
                dispatch(Actions.messageReceived(message));
            }
        )
    }, []);

    const addSubscription = useCallback((destination: string) => {
        const subscription = subscribe(destination);

        dispatch(Actions.subscriptionAdded(destination, subscription));
    }, [subscribe]);

    const toggleSubscription = useCallback((destination: string) => {
        const subscription = state.subscriptions[destination];

        if(subscription.enabled) {
            subscription.unsubscribe();
            dispatch(Actions.subscriptionDisabled(destination));
        } else {
            const newSubscription = subscribe(destination);

            dispatch(Actions.subscriptionEnabled(destination, newSubscription));
        }
    }, [subscribe, state.subscriptions]);

    const removeSubscription = useCallback((destination: string) => {
        const subscription = state.subscriptions[destination];

        if(subscription.enabled) {
            subscription.unsubscribe();
        }

        dispatch(Actions.subscriptionRemoved(destination));
    }, [state.subscriptions]);

    const clearMessages = useCallback(() => {
        dispatch(Actions.messagesCleared());
    }, []);

    const send = useCallback((destination: string, headers?: {}, body?: any) => {
        client.current?.send(destination, headers, typeof body === 'string' ? body : JSON.stringify(body));
    }, []);

    return (
        <StompContext.Provider value={{
            state,
            connect,
            disconnect,
            addSubscription,
            toggleSubscription,
            removeSubscription,
            clearMessages,
            send
        }}>
            {props.children}
        </StompContext.Provider>
    )
}

export default StompContext
