import React from 'react';
import './App.css';
import TickerWebSocket from './Ticker';

const App = () => {
  return (
    <div className="App">
      <h1>Stock Tracker</h1>
      <TickerWebSocket />
    </div>
  );
}

export default App;
