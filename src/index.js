import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import Store from './store'
import AlertTemplate from 'react-alert-template-basic'
import {positions,transitions,Provider as AlertProvider} from 'react-alert'

const options = {
  timeout : 5000, 
  position : positions.BOTTOM_CENTER, 
  transtion : transitions.SCALE
}

ReactDOM.render(
  <Provider store={Store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>,
  document.getElementById('root')
);

