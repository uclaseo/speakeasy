import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { AppContainer } from 'react-hot-loader';
import ReductPromise from 'redux-promise';
import rootReducer from './src/reducers/index';
import App from './src/components/app';



const createStoreWithMiddleware = applyMiddleware()(createStore);

function render(App) {
  ReactDOM.render(
      <Provider store={createStoreWithMiddleware(rootReducer)}>
        <AppContainer>
          <App />
        </AppContainer>
      </Provider>,
    document.getElementById('root')
  );
}

console.log('is it hot ', module);
if (module.hot) {
  module.hot.accept('./src/components/app', () => { 
    const nextApp = require('./src/components/app').default;
    render(nextApp);
  })
};

render(App);