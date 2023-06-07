import './Home.css';
import CandleStick from '../chart/CandleStick';
import Details from '../details/Details';

// Per wireframe:
// Home page will contain a search input for bringing up the stock details modal.
// Home page will contain three candlestick charts for common stocks?. Composite indices are premium finnhub features.
// Home page will coantain a sector map or some other chart thing.

function Home() {
  return (
    <div className="home">
      {/* {<SearchInputForStockDetails />} */}
      <Details />
      <div className="chart-container">
        <CandleStick symbol1="AAPL" />
        <CandleStick symbol1="TSLA" />
        <CandleStick symbol1="AMZN" />
      </div>
      {/* {<SectorMap />} */}
    </div>
  );
}

export default Home;
