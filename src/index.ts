import 'reflect-metadata';
import { createConnection } from 'typeorm';

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { Request, Response } from 'express';
import Routes from './route/routes';

const app = express();
const PORT = process.env.PORT || 8000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

createConnection()
  .then(async () => {
    Routes.forEach((route) => {
      app[route.method](
        route.route,
        route.middleware ? route.middleware : [],
        (req: Request, res: Response) => {
          return route.action(req, res);
        }
      );
    });

    app.listen(PORT, () => {
      console.log(`App was listen on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
