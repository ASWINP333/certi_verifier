import express from 'express';
import { userController } from '../controllers/index.js';

const userRoutes = express.Router();

import authenticate from '../middlewares/authMiddleware.js';

userRoutes.route('/register').post(userController.register);
userRoutes.route('/login').post(userController.login);
userRoutes.route('/create').post(authenticate.user, userController.createUser);
userRoutes.route('/all').get(authenticate.user, userController.getAllUsers);
userRoutes.route('/myUsers').get(authenticate.user, userController.getMyUsers);
userRoutes.route('/delete').delete(authenticate.user, userController.deleteUser);

export default userRoutes;
