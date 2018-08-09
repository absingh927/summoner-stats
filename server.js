require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const path = require('path');

// Create Express App
const app = express();

// Middleware
app.use(helmet());

// Mount API routes.
app.use('/api', require('./server/routes'));

// If production, serve the client/build folder for all requests.
if (process.env.NODE_ENV === 'production') {
  // Serve static assets
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Map all get requests to the React index.html file.
  app.get('*', (_, res) => res.sendFile(path.join(__dirname, 'client/build', 'index.html')));
}

// Listen for connections
const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', _ => console.log(`Summoner Stats server listening on port ${port}`));