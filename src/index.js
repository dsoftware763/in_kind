import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import rootReducer from './reducers';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import logger from 'redux-logger';
import { userLoggedin } from './actions/authentication';
import NoMatch from './components/404/nomatch';
import io from 'socket.io-client';
import {chatUrl} from './constants/type';
const socket = io(chatUrl);
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger))
sagaMiddleware.run(rootSaga);
if (localStorage.userJWT) {
    let token = localStorage.userJWT
    let role = localStorage.userRole
    let uId = localStorage.uId
    store.dispatch(userLoggedin(token, role, uId))
}
if(!socket.connected) {
    socket.on('connect', function () {
        // socket.emit('RECEIVE_CHAT_LIST', {
        //     id: localStorage.uId,
        // })
        // socket.on('CHAT_LIST', function (data) {
        //     store.dispatch(messageListConnect(data))
        // })
        // socket.on('RECEIVE_MESSAGE', function (data) {
        //     store.dispatch(recevieMessage(data))
        // })
    })
    
}
ReactDOM.render(<BrowserRouter>
    <Provider store={store}>
        <Route  component={App} />
        {/* <Route exact component={NoMatch} /> */}
    </Provider>
</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
