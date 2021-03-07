import State from "./State";
import { StompAction } from "./stompMiddleware";
import Stomp from 'stompjs';

export const CONNECT_REQUEST = "CONNECT_REQUEST";
export const CONNECT_SUCCESS = "CONNECT_SUCCESS";
export const CONNECT_FAILURE = "CONNECT_FAILURE";

type ConnectRequest = {
    type: typeof CONNECT_REQUEST;
}

type ConnectSuccess = {
    type: typeof CONNECT_SUCCESS;
}

type ConnectFailure = {
    type: typeof CONNECT_FAILURE;
}

export type ConnectAction = ConnectRequest | ConnectSuccess | ConnectFailure;

export const stompConnect = (ws: WebSocket): StompAction<State, ConnectAction, Promise<void>> => ({setStompClient, dispatch}) => new Promise((resolve) => {
    dispatch({type: CONNECT_REQUEST});

    const client = Stomp.over(ws);
    client.debug = console.debug;
    setStompClient(client);

    client.connect({}, () => {
        dispatch({type: CONNECT_SUCCESS});
        resolve();
    }, () => {
        dispatch({type: CONNECT_FAILURE});
        resolve();
    })
})

export const subscribe = (destination: string): StompAction<State, ConnectAction, void> => ({stompClient}) => {
    stompClient.subscribe(destination);
}

export const sendMessage = (destination: string, body: string): StompAction<State, ConnectAction, void> => ({stompClient}) => {
    stompClient.send(destination, undefined, body);
}