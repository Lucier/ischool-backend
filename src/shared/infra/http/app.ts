import 'reflect-metadata';
import { errors } from 'celebrate';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import { AppError } from '@shared/errors/AppError';

import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(express.json());
app.use(routes);

app.use(errors());

app.use(
  (err: Error, reques: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
  },
);

export default app;
