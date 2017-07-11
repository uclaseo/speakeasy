import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { AppContainer } from 'react-hot-loader';
import rootReducer from './src/reducers/index';
import App from './src/components/app';



const createStoreWithMiddleware = applyMiddleware()(createStore);

const rootEl = document.getElementById('root');

const render = Component => 
  ReactDOM.render(
    <AppContainer>
      <Provider store={createStoreWithMiddleware(rootReducer)}>
        <Component />
      </Provider>
    </AppContainer>,
    rootEl
  );

if (module.hot) {
  module.hot.accept('./src/components/app.js', () => render(App))
};