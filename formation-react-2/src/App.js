import React from 'react';
import Cards from './Cards/Cards';
import { EqptContext } from './contexts';
import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <EqptContext.Provider value={'OLT Ptin'}>
          <Cards />
        </EqptContext.Provider>
      </header>
    </div>
  );
}

export default App;
