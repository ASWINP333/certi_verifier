import express from 'express';

const certificateRoutes = express.Router();

import authenticate from '../middlewares/authMiddleware.js';
import { certificateController } from '../controllers/index.js';

certificateRoutes
  .route('/create')
  .post(certificateController.createCertificate);
certificateRoutes
  .route('/getAll')
  .get(certificateController.getAllCertificates);
certificateRoutes
  .route('/get/:iId')
  .get(certificateController.getSingleCertificate);
certificateRoutes
  .route('/update/:iId')
  .put(certificateController.updateCertificate);
certificateRoutes
  .route('/delete/:iId')
  .delete(certificateController.deleteCertificate);

export default certificateRoutes;
