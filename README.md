# Summoner Stats
Summoner Stats is an NodeJS Express + ReactJS app that serves as a simple demonstration app for interacting with the Riot API to show recent League of Legends match history.

View the live sample here: https://summoner-stats.herokuapp.com/

# Running Locally
To run summoner-stats locally, clone this repository and run the following command from the project's root directory:


**Note:** `dotenv` is utilized to load environment variables at runtime so you should place your Riot API key in a file called `.env`. A sample `.env.sample` file is provided as an example and includes the RIOT_API_URL variable which you should also copy into your `.env` file.


```
npm install && cd client && npm install
cd ../
npm run dev
```

The first command will install the server-side dependencies, switch to the client directory, and then install the dependencies for the client-side. After installing dependencies, switch back to the project's root directory and run `npm run dev`.

`npm run dev` will fire up both the server and client apps which can then be utilized via `http://localhost:3000`

# Heroku Ready
`package.json` and `Procfile` together make this application ready to be published to Heroku immediately. The only manual work required is to set the environment variables for the Heroku app. Simply link the repository up to Heroku and deploy the master branch.

# Testing
A few unit tests have been written for the client as a proof-of-concept, and could be further expanded to other pieces of the client code and even on to the server pieces, too.

To run the demo tests, switch to the `client` directory and run `npm test`

```
cd client && npm test
```

# Caveats
The server will make a few requests to particular `static-data` endpoints on Riot's API - these endpoints are rate limited to fairly low limits per hour. Running the server multiple times may cause you to hit these rate limits and should be avoided.

Of course, other standard rate limits are in place and there is no caching of summoner results as this is just a simple demo. Running into rate limit constraints may interrupt the experience if encountered.