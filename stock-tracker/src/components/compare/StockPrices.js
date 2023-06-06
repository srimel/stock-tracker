import React, { useState, useEffect } from 'react';
import CandleStick from '../chart/CandleStick';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const StockPrices = () => {
  const [symbol1, setSymbol1] = useState('');
  const [symbol2, setSymbol2] = useState('');
  const [currentPrice1, setCurrentPrice1] = useState(null);
  const [currentPrice2, setCurrentPrice2] = useState(null);
  const [change1, setChange1] = useState(null);
  const [change2, setChange2] = useState(null);
  const [companyName1, setCompanyName1] = useState('');
  const [companyName2, setCompanyName2] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [recommendation1, setRecommendation1] = useState({});
  const [recommendation2, setRecommendation2] = useState({});
  const [percentChange1, setPercentChange1] = useState(null);
  const [percentChange2, setPercentChange2] = useState(null);
  const [search1, setSearch1] = useState('');

  const handleSymbolChange = (event, symbolNumber) => {
    const symbol = event.target.value;
    if (symbolNumber === 1) {
      setSymbol1(symbol);
    } else if (symbolNumber === 2) {
      setSymbol2(symbol);
    }
  };

  const fetchStockPrice = async () => {
    if (!symbol1 || !symbol2) {
      setErrorMessage('Please enter two valid stock symbols for comparison');
      return;
    }

    try {
      setErrorMessage('');

      const response1 = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol1}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`
      );
      const data1 = await response1.json();
      setCurrentPrice1(data1.c);
      setChange1(data1.d);
      setPercentChange1(data1.dp);

      const companyResponse1 = await fetch(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol1}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`
      );
     
      const companyData1 = await companyResponse1.json();
      setCompanyName1(companyData1.name);

      const response2 = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol2}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`
      );
      const data2 = await response2.json();
      setCurrentPrice2(data2.c);
      setChange2(data2.d);
      setPercentChange2(data2.dp);

      const companyResponse2 = await fetch(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol2}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`
      );
      const companyData2 = await companyResponse2.json();
      setCompanyName2(companyData2.name);

      const recommendationResponse1 = await fetch(
        `https://finnhub.io/api/v1/stock/recommendation?symbol=${symbol1}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`
      );
      const recommendationData1 = await recommendationResponse1.json();
      setRecommendation1(recommendationData1[0]);

      const recommendationResponse2 = await fetch(
        `https://finnhub.io/api/v1/stock/recommendation?symbol=${symbol2}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`
      );
      const recommendationData2 = await recommendationResponse2.json();
      setRecommendation2(recommendationData2[0]);
    } catch (error) {
      console.error('Error fetching stock price:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearch1(event.target.value);
    setErrorMessage('');
  };
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchStockPrice();
  };

  useEffect(() => {
    fetchStockPrice();
  }, []);

  return (
    <div>
      <Container className="mt-0">
      <Form className="mb-4" onSubmit={handleSearchSubmit}>
      <div  className="d-flex justify-content-center" >
      <h1>Stock Comparison</h1>
      </div>
      <InputGroup className="d-flex justify-content-center">
        <Form.Control
          type="text"
          value={symbol1}
          onChange={(event) => handleSymbolChange(event, 1)}
          placeholder="Enter stock symbol 1"
        />
        <Form.Control
          type="text"
          value={symbol2}
          onChange={(event) => handleSymbolChange(event, 2)}
          placeholder="Enter stock symbol 2"
        />
        <Button type="submit">COMPARE</Button> 
      </InputGroup>
      </Form>
      

      
    <div className="d-flex justify-content-between">
      <div className="mx-auto mt-4">
        {currentPrice1 && (
          <Card bg="light" border="primary" className = "w-30">
            <Card.Body>
              <Card.Title>{companyName1}</Card.Title>
              <Card.Text>
                Symbol: {symbol1}<br/>
                Current Share Price: {currentPrice1}<br/>
                Change: {change1}<br/>
                Percent Change: {percentChange1}<br/>
                <h5>Recommended Trends</h5>
                Buy: {recommendation1.buy}<br/>
                Sell: {recommendation1.sell}<br/>
                Hold: {recommendation1.hold}<br/>
                Period: {recommendation1.period}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
        
        <CandleStick symbol1= {symbol1} />
      </div>
      <div className ="mx-auto mt-4">
        {currentPrice2 && (
          <Card bg="light" border="success" className = "w-30">
            <Card.Body>
              <Card.Title>{companyName2}</Card.Title>
              <Card.Text>
                Symbol: {symbol2}<br/>
                Current Share Price: {currentPrice2}<br/>
                Change: {change2}<br/>
                Percent Change: {percentChange2}<br/>
                <h5>Recommended Trends</h5>
                Buy: {recommendation2.buy}<br/>
                Sell: {recommendation2.sell}<br/>
                Hold: {recommendation2.hold}<br/>
                Period: {recommendation2.period}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
        <CandleStick symbol1= {symbol2} />
      </div>
    </div>
    </Container>
  </div>
);
};

export default StockPrices;