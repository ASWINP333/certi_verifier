import express from 'express';

const institutionRoutes = express.Router();

import authenticate from '../middlewares/authMiddleware.js';
import { institutionController } from '../controllers/index.js';

institutionRoutes
  .route('/create')
  .post(institutionController.createInstitution);
institutionRoutes
  .route('/getAll')
  .get(institutionController.getAllInstitutions);
institutionRoutes
  .route('/get/:iId')
  .get(institutionController.getInstitutionById);
institutionRoutes
  .route('/update/:iId')
  .put(institutionController.updateInstitution);
institutionRoutes
  .route('/delete/:iId')
  .delete(institutionController.deleteInstitution);

export default institutionRoutes;
