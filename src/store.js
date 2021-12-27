import { createStore , applyMiddleware} from 'redux';
import rootReducer from './reducers'
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';

const initialState = {}
const middleware = [thunk];

// to access react dev tools
const composeEnhancers = composeWithDevTools({
    realtime: true,
    name: 'Demo',
    hostname: 'localhost',
    port: 3000 // the port your remotedev server is running at
  })

const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
        applyMiddleware(...middleware)
    )
)

export default store