import express from 'express';

const studentRoute = express.Router();

import authenticate from '../middlewares/authMiddleware.js';
import { studentController } from '../controllers/index.js';

studentRoute
  .route('/create')
  .post(authenticate.user, studentController.createStudent);

studentRoute.route('/login').post(studentController.loginStudent);

studentRoute
  .route('/getAll')
  .get(authenticate.user, studentController.getAllStudents);

studentRoute
  .route('/myCertificates')
  .get(authenticate.user, studentController.getMyCertificates);

studentRoute
  .route('/myStudents')
  .get(authenticate.user, studentController.getMyStudents);

studentRoute
  .route('/delete/:studentId')
  .delete(studentController.deleteStudent);

export default studentRoute;
