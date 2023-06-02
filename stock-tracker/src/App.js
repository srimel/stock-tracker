import './App.css';
import CandleStick from './components/chart/CandleStick';
import StockPrices from './StockPrices';

function App() {
  return (
    <div className="App">
      <StockPrices />
    </div>
    /*
    <div className="chart-container">
    <CandleStick symbol1="AAPL" symbol2="GOOGL" />
    <CandleStick symbol1="TSLA" />
    <CandleStick symbol1="AMZN" />
  </div> 
  */
  );
}

export default App;
