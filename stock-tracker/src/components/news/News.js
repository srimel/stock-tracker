import React, { useState, useEffect } from 'react';

// Defaults to get one month of company news

function News(props) {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
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
        `https://finnhub.io/api/v1/company-news?symbol=AAPL&from=2023-01-01&to=2023-05-01&token=${process.env.REACT_APP_FINNHUB_API_KEY}`,
      );

      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        return;
      }

      const data = await response.json();
      console.log('news', data);
      setNews(data);
    };

    fetchNews();
  }, []);

  return (
    <div className="news">
      <h1>Financial News Hub</h1>
      {news.length ? (
        news.map((item, index) => (
          <div key={index}>
            <h2>{item.headline}</h2>
            <p>{item.summary}</p>
          </div>
        ))
      ) : (
        <p>Failed to load news data...</p>
      )}
    </div>
  );
}

export default News;
