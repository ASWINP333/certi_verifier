import express from 'express';

const certificateRoutes = express.Router();

import authenticate from '../middlewares/authMiddleware.js';
import { certificateController } from '../controllers/index.js';

certificateRoutes
  .route('/create')
  .post(authenticate.user, certificateController.createCertificate);
certificateRoutes
  .route('/getAll')
  .get(authenticate.user, certificateController.getAllCertificates);
certificateRoutes
  .route('/get/:cId')
  .get(authenticate.user, certificateController.getSingleCertificate);
certificateRoutes
  .route('/update/:cId')
  .put(authenticate.user, certificateController.updateCertificate);
certificateRoutes
  .route('/delete/:cId')
  .delete(authenticate.user, certificateController.deleteCertificate);

export default certificateRoutes;
