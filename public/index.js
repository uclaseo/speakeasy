import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { AppContainer } from 'react-hot-loader';
import ReductPromise from 'redux-promise';
import rootReducer from './src/reducers/index';
import App from './src/components/app';

const store = createStore(
  rootReducer,
  applyMiddleware()
);


function render(App) {
  ReactDOM.render(
        <AppContainer>
          <Provider store={store}>
            <App />
          </Provider>
        </AppContainer>,
    document.getElementById('root')
  );
}

render(App);