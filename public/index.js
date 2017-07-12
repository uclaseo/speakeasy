import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { AppContainer } from 'react-hot-loader';
import ReductPromise from 'redux-promise';
import rootReducer from './src/reducers/index';
import App from './src/components/app';

<<<<<<< HEAD


const createStoreWithMiddleware = applyMiddleware()(createStore);

function render(App) {
  ReactDOM.render(
      <Provider store={createStoreWithMiddleware(rootReducer)}>
        <AppContainer>
          <App />
        </AppContainer>
      </Provider>,
=======
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
>>>>>>> front end chat test
    document.getElementById('root')
  );
}

console.log('is it hot ', module);
if (module.hot) {
<<<<<<< HEAD
  module.hot.accept('./src/components/app', () => { 
    const nextApp = require('./src/components/app').default;
    render(nextApp);
=======
  module.hot.accept('./src/reducers/index', () => {   
    store.replaceReducer(rootReducer);
  });

  module.hot.accept('./src/components/app', () => {
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <App />
        </Provider>
      </AppContainer>,
      document.getElementById('root')
    )
>>>>>>> front end chat test
  })
};

render(App);