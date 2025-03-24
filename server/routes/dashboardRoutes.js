import express from 'express';

const dashboardRoutes = express.Router();

import authenticate from '../middlewares/authMiddleware.js';
import { dashboardController } from '../controllers/dashboardController.js';

dashboardRoutes
  .route('/')
  .get(authenticate.user, dashboardController.getDashboardValues);

export default dashboardRoutes;
