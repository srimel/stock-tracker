import './App.css';
import CandleStick from './components/chart/CandleStick';

function App() {
  return (
    <div className="App">
      <h1>Site Under Construction...</h1>
      <div className="chart-container">
        <CandleStick symbol1="AAPL" />
        <CandleStick symbol1="TSLA" />
        <CandleStick symbol1="AMZN" />
      </div>
    </div>
  );
}

export default App;
