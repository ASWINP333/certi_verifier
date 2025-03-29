import express from 'express';

const templatesRoutes = express.Router();

import authenticate from '../middlewares/authMiddleware.js';
import { templateController } from '../controllers/index.js';
import { upload } from '../utils/multer.js';

templatesRoutes
  .route('/create')
  .post(
    authenticate.user,
    upload.single('templateImage'),
    templateController.createTemplate
  );

templatesRoutes
  .route('/getAll')
  .get(authenticate.user, templateController.getTemplates);

templatesRoutes
  .route('/delete/:id')
  .delete(authenticate.user, templateController.deleteTemplate);

export default templatesRoutes;
