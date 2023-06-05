import React, { useState } from 'react';
import CandleStick from '../chart/CandleStick';

const StockProfile = () => {
  const [symbol, setSymbol] = useState('');
  const [companyProfile, setCompanyProfile] = useState(null);
  const [logoUrl, setLogoUrl] = useState('');
  const [finnhubIndustry, setFinnhubIndustry] = useState('');
  const [ipoDate, setIpoDate] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchStockProfile = async () => {
    setLoading(true);

    try {
      const response = await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`);
      const data = await response.json();

      setCompanyProfile(data);
      setLogoUrl(data.logo);
      setFinnhubIndustry(data.finnhubIndustry);
      setIpoDate(data.ipo);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (symbol) {
      fetchStockProfile();
    }
  };

  return (
    <div>
    <div className="d-flex justify-content-center">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter stock symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
        <button type="submit">Get Profile</button>
      </form>
      {loading && <p>Loading...</p>}
      </div>
    <div className="d-flex justify-content-center mt-2">
      {companyProfile && (
        <div className = "bg-info">
          <div className="d-flex justify-content-center">
            <div>
          <h2>{companyProfile.name}</h2>
          <p>{companyProfile.exchange}</p>
          <p>Country: {companyProfile.country}</p>
          <p>Website: {companyProfile.weburl}</p>
          <p>Industry: {finnhubIndustry}</p>
          <p>IPO: {ipoDate}</p>
          <img src={logoUrl} alt="Company Logo" />
          </div>
          <CandleStick symbol1= {symbol} />
          </div>
        </div>
      )}
      </div>
      </div>
  );
};

export default StockProfile;