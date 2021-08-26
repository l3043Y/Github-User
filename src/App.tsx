import React from 'react';
import './App.css';
import UserList from './components/UserList';
import {observer} from 'mobx-react'


const App = observer(()=> {  
  return (
      <div className="App">
        
        <UserList  />
      </div>
  );
}) 

export default App;
