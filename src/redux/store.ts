import { useDispatch } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { ConnectAction } from "./actions";
import reducer from "./reducer";
import State from "./State";
import stompMiddleware, { StompDispatch } from "./stompMiddleware";

const store = createStore(reducer, applyMiddleware(stompMiddleware));

export const useStompDispatch = () => useDispatch<StompDispatch<State, ConnectAction>>();

export default store;