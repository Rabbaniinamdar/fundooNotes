/* eslint-disable prettier/prettier */
import express from 'express';
const router = express.Router();

import userRoute from './user.route';
import noteRoute from './note.rout';

const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', userRoute);
  router.use('/note', noteRoute);

  return router;
};

export default routes;
