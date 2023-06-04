import React, { useState, useEffect } from 'react';

function News(props) {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
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
        <p>Coming soon...</p>
      )}
    </div>
  );
}

export default News;
