# stock-tracker

Project members: Richard Duffy, Jacob Bentley, Stuart Rimel

## CS-464 - Front End Web Tech - Paun

### Final Project: Stock Tracker ###

For our final project we have created a dashboard that tracks and displays various data regarding the stock market.  We have selected [https://finnhub.io/]() as our API and use it to fetch and display real time data for our dashboard.  Stock Tracker has a number of features and pages that will be outlined below:

### Home Page ###

The home page has an active stock ticker across the top that is up to date and presents real time data for viewing. 

....will fill in details once home page is completed...

There is also a navigation bar across the top of the page that will allow the user to view the different pages comprising the dashboard.  The three component pages the user can view are: Home Page, Comparison Page, and the News Page.  Each page can be navigated to directly by simply selecting the desired location in the navigation bar.

### Comparison Page ###

The Comparison Page is comprised of two search bars in which the user must enter two stock symbols in order to see a side-by-side comparison of the two companies entered.  Once two valid stock symbols have been entered and the 'COMPARE' button has been clicked a display will generate that contains current and up-to-date information regarding the current state of those specific stocks.  Data includes: the company name, symbol, current share price, change, and the percent of change.  It also contains a section for recommended trends in terms of buy, sell, or hold for that particular stock.  Below this information will be a chart that tracks the performance of the stock over time.  The user also has the ability to manipulate the time period displayed in the chart and may select from 3 months, 6 months or 1 year.  This feature is unique because it allows for the direct side-by-side comparison of two specific stocks.

### News Page ###

The News Page again allows the user to enter a company and then generates a scrollable feed of news headlines pertaining to that company.  This allows the user to be able to quickly and easily gain access to the current news regarding the company they are interested in.  Each headline contains an image, a brief text blurb, as well as a clickable link that will take the user directly to the main article.  This page stands out because it goes beyond simply displaying metrics and data regarding the company and allows the user to gain easy access to the current state of affairs of a specific company.

### Ticker ###

Another main feature of our dashboard is the live stock ticker that can be seen scrolling across the top of the screen providing real time updates.  This feature was difficult to implement due to the vagaries of websockets and the bugginess of CSS animations, but we felt that it would be worth it in the end and it has become one of the keystone features of our dashboard.

### API ###

The Finnhub API that we used was one that came with a number of challenges and limitations due to its lackluster management and maintenance; we had to alter some of our original designs to accommodate its idiosyncrasies.  Despite the challenges, we were still able to create a simple yet useful dashboard for gaining various kinds of information about the stock market.  

### Tech Stack ###

We were able to be very effective in our manipulation of React in order to create this dashboard and were able to utilize some of its many features effectively.  We relied on Bootstrap for our styling and the result was a smooth and highly functional dashboard.  We also used Apex Charts in creating our Candlestick charts, which are not only informative but interactive as well, increasing our capacity for user engagement.

### Summary ###

Overall we have created an informative and aesthetic dashboard that is both user friendly and effective.  We strove to bring some unique features to a stock dashboard that went beyond simply displaying data and metrics and did so by incorporating interactive features, live data updates and comparisons, as well as a per-company news feed.

