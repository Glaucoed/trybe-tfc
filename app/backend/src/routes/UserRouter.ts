import { Router, Request, Response, NextFunction } from 'express';
import authToken from '../api/middleware/authToken';
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

teamRouter.get(
  '/login/role',
  authToken.authenticate,
  (req: Request, res: Response) => userController.getRole(req, res),
);

export default teamRouter;
