import { Action, AnyAction, MiddlewareAPI } from "redux";
import { Client } from "stompjs";

export type StompAction<
    S,
    A extends Action,
    R
> = (api: {stompClient: Client, setStompClient: (client: Client) => void, dispatch: StompDispatch<S, A>, getState: () => S}) => R;

export type StompDispatch<
    S,
    A extends Action
> = {
    <R>(stompAction: StompAction<S, A, R>): R;
    <T extends A>(action: T): T;
    <R, T extends A>(action: T | StompAction<S, A, R>): T | R;
}

const stompMiddleware = <S = {}, A extends Action = AnyAction>({dispatch, getState}: MiddlewareAPI<StompDispatch<S, A>, S>) => 
(next: StompDispatch<S, A>) => 
<R>(action: StompAction<S, A, R> | A) => {
    if(typeof action === "function") {
        return action({
            stompClient,
            setStompClient,
            dispatch,
            getState
        });
    }

    return next(action);
}

export default stompMiddleware;

let stompClient: Client;
const setStompClient = (client: Client) => stompClient = client;
