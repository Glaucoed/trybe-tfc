import { Router, Request, Response, NextFunction } from 'express';
import validateFieldsUser from '../api/middleware/validateFieldsUser';
import UserController from '../api/controller/UserController';
import UserService from '../api/services/UserService';

const teamRouter = Router();

const userService = new UserService();
const userController = new UserController(userService);

teamRouter.post(
  '/login',
  validateFieldsUser.checkFields,
  (req: Request, res: Response, next: NextFunction) => userController.verifyLogin(req, res, next),
);

export default teamRouter;
