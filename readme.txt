Instructions

1. Unzip the application
2. Run the following from within stockr-web/
    npm install
    npm start

Process/Reflection

Overall, I spent about 7-8 hours total on this exercise. The first half hour or so was spent on reading through the given spec, playing around with the Alphavantage API and generating the application stub (using create-react-app).

The next hour was spent on scribbling a few UI mockups on pen and paper, first an overall wireframe and then each individual component and their subcomponents if applicable. I find that this approach is extremely helpful, especially when working with React.JS as, in an ideal situation, I can knock out components independent of each other. The main components that I ended on were a Balance component, which would display the user's current balance and allow them to manipulate it via withdrawl and desposit actions, a Portfolio component, which would display the user's bought stocks and provide the ability to sell them, and a StockList component which would display the stocks for that day and allow the user to use their balance to purchase  them. All three were to be contained within a Container component.

In retrospect, I do wish that I had spent some more time on this stage, as I found that I had some trouble piecing together the components, and determining the concrete responsibilitis of each one. For example, I began writing the StockEntry subcomponent for StockList, which in my head, would go out to the Alphavantage API, fetch the stocks for the day for the company that it represented and render them. This later proved to be a fairly detrimental decision as when it came writing the PortfolioEntry subcomponent, I found I had to make the same API call to track the price. If I had more time to do it over, I would have started with the main Container component, and controlled the calls to the API from there, passing locally stored results to its Portfolio and StockList children to reduce network activity.

There were also some active design choices made in the interest of the exercise's timewindow. This included getting a list of companies from the NASDAQ exchange, creating a very small subset and storing it as a local module. Given more time, I would look into other API's outside of Alphavantage that provide a list of stock keys to implement a more practical StockList component. In addition, I would’ve like to add more tests, via React propTypes, etc.
