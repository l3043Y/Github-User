import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UserContext from './contexts/UserContext';
import UserStore from './models/UserStore';

ReactDOM.render(
  <React.StrictMode>
    <UserContext.Provider value={UserStore.getInstance()}>
      <App />
    </UserContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);