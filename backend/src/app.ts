import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import { connectDB } from './config/';
import morgan from 'morgan';
import routes from './routes';
import { errorHandler, notFound } from './middlewares/error.middlewares';
import securityMiddleware from './middlewares/security.middleware';
import { PORT } from './constants/';

const app = express();

app.use(morgan('dev'));
dotenv.config();

// security middleware (cors, xss, mongo sanitize)
securityMiddleware(app);

// setting up body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, async () => {
  console.info(
      `App is running at port ${PORT} & url http://localhost:${PORT} is live. PID ${process.pid}`
  );

  await connectDB();

  routes(app);

  // error handler
  app.use(notFound);
  app.use(errorHandler);
});

// terminal close
process.on('SIGINT', function () {
  console.info('Closing the process by user');
  process.exit(0);
});

// system close
process.on('SIGTERM', function () {
  console.info('Closing the process by system');
  process.exit(0);
});

process.on('uncaughtException', (err) => {
  console.info('UNHANDLED EXCEPTION ERROR!!!', err);
  if (err.stack) console.log(err.stack);
});

process.on('unhandledRejection', (err: any) => {
  console.info('UNHANDLED REJECTION ERROR!!!', err);
  if (err.stack) console.log(err.stack);
});
