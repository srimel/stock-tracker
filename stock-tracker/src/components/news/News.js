import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';

function News(props) {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState('');

  const fetchNews = async (symbol) => {
    const today = new Date();
    const monthAgo = new Date();
    monthAgo.setMonth(today.getMonth() - 1);

    const formatDate = (date) => {
      const year = date.getFullYear();
      let month = date.getMonth() + 1; // months are zero indexed
      let day = date.getDate();

      // prepend month or day with zero if single digit
      if (month < 10) {
        month = `0${month}`;
      }
      if (day < 10) {
        day = `0${day}`;
      }

      return `${year}-${month}-${day}`;
    };

    console.log('today', formatDate(today));
    console.log('monthAgo', formatDate(monthAgo));

    const response = await fetch(
      `https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${formatDate(
        monthAgo,
      )}&to=${formatDate(today)}&token=${
        process.env.REACT_APP_FINNHUB_API_KEY
      }`,
    );

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return;
    }

    const data = await response.json();
    console.log('news', data);
    setNews(data);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchNews(search);
  };

  return (
    <div className="news">
      <Container className="mt-0">
        <Form className="mb-4" onSubmit={handleSearchSubmit}>
          <InputGroup className="w-25 mx-auto">
            <Form.Control
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search by company symbol..."
            />
            <Button type="submit">Search</Button>
          </InputGroup>
        </Form>

        {news.length ? (
          news.slice(0, 20).map((item, index) => (
            <Card className="mb-4 w-50 mx-auto" key={index}>
              <Card.Img variant="top" src={item.image} />
              <Card.Body>
                <Card.Title>{item.headline}</Card.Title>
                <Card.Text>{item.summary}</Card.Text>
                <Card.Link href={item.url}>Full article</Card.Link>
              </Card.Body>
            </Card>
          ))
        ) : (
          <div className="d-flex justify-content-center">
            <p>Enter a stock symbol to retrieve company news...</p>
          </div>
        )}
      </Container>
    </div>
  );
}

export default News;
