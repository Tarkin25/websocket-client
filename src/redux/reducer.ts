import { ConnectAction } from "./actions";
import State from "./State"

const initialState: State = {
    connected: false
}

const reducer = (state = initialState, action: ConnectAction): State => {
    switch (action.type) {
        
        default:
            return state;
    }
}

export default reducer;