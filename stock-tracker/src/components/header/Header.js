import './Header.css';
import Navigation from '../navigation/Navigation';

// This file will contain the header for the site that will persist regardless of navigation.
// It will contain the site title and navigation links as well as the stock ticker.

function Header() {
  return (
    <div className="header mb-5">
      {/* <StockTicker /> */}
      <div className="d-flex justify-content-center">
        <h1>Stock Tracker</h1>
      </div>
      <Navigation />
    </div>
  );
}

export default Header;
