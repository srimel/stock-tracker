import './App.css';

const App = () => {
  const finnhub = require('finnhub');

  const api_key = finnhub.ApiClient.instance.authentications['api_key'];
  api_key.apiKey = process.env.REACT_APP_API_KEY;
  const finnhubClient = new finnhub.DefaultApi();

  // Tick Data
  finnhubClient.stockTick("AAPL", "2020-03-25", 500, 0, (error, data, response) => {
      console.log(data);
  });

  return (
    <div className="App">
      <h1>Stock Tracker</h1>
      <p>Stuff...</p>
    </div>
  );
}

export default App;
