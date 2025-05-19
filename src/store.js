import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { appReducer, postReducer, postsReducer, userReducer, usersReducer } from './reducers';
import { thunk } from 'redux-thunk';

const reducer = combineReducers({
    app: appReducer,
    user: userReducer,
    users: usersReducer,
    post: postReducer,
    posts: postsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
