import express from 'express';
import userRoutes from './userRoutes.js';
import institutionRoutes from './institutionRoutes.js';
import certificateRoutes from './certificateRoutes.js';
import dashboardRoutes from './dashboardRoutes.js';
import templatesRoutes from './templateRoutes.js';
import studentRoute from './studentRoutes.js';

const routes = express.Router();

routes.use('/user', userRoutes);
routes.use('/institution', institutionRoutes);
routes.use('/certificate', certificateRoutes);
routes.use('/dashboard', dashboardRoutes);
routes.use('/template', templatesRoutes);
routes.use('/student', studentRoute);

export default routes;
