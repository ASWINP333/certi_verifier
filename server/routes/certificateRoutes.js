import express from 'express';

const certificateRoutes = express.Router();

import authenticate from '../middlewares/authMiddleware.js';
import { certificateController } from '../controllers/index.js';

certificateRoutes
  .route('/create')
  .post(authenticate.user, certificateController.createCertificate);

certificateRoutes
  .route('/student/create')
  .post(authenticate.user, certificateController.createStudentCertificate);

certificateRoutes
  .route('/verify/:cId')
  .post(authenticate.user, certificateController.verifyCertificate);

certificateRoutes
  .route('/revoke/:cId')
  .delete(authenticate.user, certificateController.revokeCertificate);

certificateRoutes
  .route('/getAll')
  .get(authenticate.user, certificateController.getAllCertificates);

certificateRoutes
  .route('/get/date')
  .get(authenticate.user, certificateController.getCertificatesByDate);

certificateRoutes
  .route('/myCertificates')
  .get(authenticate.user, certificateController.getMyCertificates);

certificateRoutes
  .route('/institutionCertificates')
  .get(authenticate.user, certificateController.getInstitutionCertificates);

certificateRoutes
  .route('/get/:cId/:iId')
  .get(certificateController.getSingleCertificate);

certificateRoutes
  .route('/get/:id')
  .get(certificateController.getSingleCertificateById);

certificateRoutes
  .route('/update/:cId')
  .put(authenticate.user, certificateController.updateCertificate);

certificateRoutes
  .route('/delete/:id')
  .delete(authenticate.user, certificateController.deleteCertificate);

export default certificateRoutes;
