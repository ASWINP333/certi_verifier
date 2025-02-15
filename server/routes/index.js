import express from 'express';
import userRoutes from './userRoutes.js';
import institutionRoutes from './institutionRoutes.js';
import certificateRoutes from './certificateRoutes.js';

const routes = express.Router();

routes.use('/user', userRoutes);
routes.use('/institution', institutionRoutes);
routes.use('/certificate', certificateRoutes);

export default routes;
