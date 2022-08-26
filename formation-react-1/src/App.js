import Chronometer from './Chronometer/Chronometer';
import Cards from './Cards/Cards';
import { EqptContext } from './contexts';

import './App.css';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        {/* <Chronometer /> */}
        <EqptContext.Provider value='OLT Ptin'>
          <Cards />
        </EqptContext.Provider>
      </header>
    </div>
  );
}

export default App;