import express from 'express';
import { userController } from '../controllers/index.js';

const userRoutes = express.Router();

userRoutes.route('/register').post(userController.register);
userRoutes.route('/login').post(userController.login);
userRoutes.route('/create').post(userController.createUser);

export default userRoutes;
