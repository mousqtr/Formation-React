import React from 'react';
import Users from './Users/Users';
import { TitleContext } from './contexts';
import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TitleContext.Provider value="Gestionnaire de joueurs">
          <Users />
        </TitleContext.Provider>
      </header>
    </div>
  );
}

export default App;
