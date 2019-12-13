import express from 'express';
import mongoose from 'mongoose';

import routes from './routes';

mongoose.Promise = global.Promise;

const app = express();

app.use('/', routes);

mongoose.connect('mongodb://localhost:27017/db')
  .then(() => {
    console.log('mongodb started.');
    app.listen(8000, () => {
      console.log('Server started on 8000');
    });
  }).catch(() => {
    console.log('Mongodb connection failed.');
  })
