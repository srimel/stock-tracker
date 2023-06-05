import './App.css';
import Header from '../components/header/Header';
import Home from '../components/home/Home';
import Compare from '../components/compare/StockPrices';
import Details from '../components/details/Details';
import { Routes, Route } from 'react-router-dom';

// The Header component will persist on all pages, so it will be placed in the App component.
// The header component will contain the site title and navigation links as well as the stock ticker.

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/news" element={<h1>News</h1>} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
