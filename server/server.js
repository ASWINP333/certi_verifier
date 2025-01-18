import 'dotenv/config';
import app from './app.js';

import connectDatabase from './config/database.js';

//Handling Uncaught Exception
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

//Connecting to the database
connectDatabase();

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log(`The server is successfully running on port ${port}`);
});

// Unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server due to unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
