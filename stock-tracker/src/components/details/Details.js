import './Details.css';
import React, { useEffect, useState } from 'react';
import CandleStick from '../chart/CandleStick';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';

function Details() {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('');
  const [symbol, setSymbol] = useState('');
  const [metrics, setMetrics] = useState({});
  const [companyName, setCompanyName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleClose = () => {
    setShow(false);
    setSymbol('');
    setSearch('');
    setMetrics({});
    setCompanyName('');
    setErrorMessage('');
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (search.trim() === '') {
      setErrorMessage('Please enter a valid stock symbol.');
    } else {
      setSymbol(search);
      setErrorMessage('');
      setShow(true);
    }
  };

  useEffect(() => {
    const fetchMetrics = async () => {
      if (!symbol) {
        return;
      }
      try {
        const response = await fetch(
          `https://finnhub.io/api/v1/stock/metric?symbol=${symbol.toUpperCase()}&metric=all&token=${
            process.env.REACT_APP_FINNHUB_API_KEY
          }`,
        );
        const data = await response.json();
        console.log('metricsData', data);

        if (data.metric) {
          const {
            '10DayAverageTradingVolume': volume,
            assetTurnoverAnnual: assetTurnover,
            bookValuePerShareQuarterly: bookValue,
            cashFlowPerShareAnnual: cashFlow,
            grossMarginAnnual: grossMargin,
            netProfitMarginAnnual: profitMargin,
            revenuePerShareAnnual: revenuePerShare,
          } = data.metric;

          setMetrics({
            volume,
            assetTurnover,
            bookValue,
            cashFlow,
            grossMargin,
            profitMargin,
            revenuePerShare,
          });

          setCompanyName(data.metric['companyName']);
        } else {
          console.error('No metrics found for the given stock symbol.');
          setErrorMessage(
            `No metrics found for the given stock symbol: ${symbol}.`,
          );
        }
        const profileResponse = await fetch(
          `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol.toUpperCase()}&token=${
            process.env.REACT_APP_FINNHUB_API_KEY
          }`,
        );
        const profileData = await profileResponse.json();

        console.log('profileData', profileData);

        if (profileData.name) {
          setCompanyName(profileData.name);
        } else {
          console.error('No company name found for the given stock symbol.');
          setErrorMessage(
            `No company name found for the given stock symbol: ${symbol}.`,
          );
        }
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };
    fetchMetrics();
  }, [symbol]);

  return (
    <div id="details">
      <Form className="mb-4" onSubmit={handleSearchSubmit}>
        <InputGroup className="w-50 mx-auto">
          <Form.Control
            type="text"
            value={search}
            onChange={handleChange}
            placeholder="Search by company symbol..."
          />
          <Button type="submit">Fetch Metrics</Button>
        </InputGroup>
      </Form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{companyName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage === '' ? (
            <>
              <p>10-Day Average Trading Volume: {metrics.volume}</p>
              <p>Asset Turnover (Annual): {metrics.assetTurnover}</p>
              <p>Book Value per Share (Quarterly): {metrics.bookValue}</p>
              <p>Cash Flow per Share (Annual): {metrics.cashFlow}</p>
              <p>Gross Margin (Annual): {metrics.grossMargin}</p>
              <p>Net Profit Margin (Annual): {metrics.profitMargin}</p>
              <p>Revenue per Share (Annual): {metrics.revenuePerShare}</p>
              {symbol && (
                <div className="d-flex justify-content-center">
                  <CandleStick symbol1={symbol.toUpperCase()} />{' '}
                </div>
              )}
            </>
          ) : (
            <p className="text-danger">{errorMessage}</p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Details;
