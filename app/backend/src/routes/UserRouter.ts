import { Router, Request, Response } from 'express';
import validateFieldsUser from '../api/middleware/validateFieldsUser';
import UserController from '../api/controller/UserController';
import UserService from '../api/services/UserService';

const teamRouter = Router();

const userService = new UserService();
const userController = new UserController(userService);

teamRouter.get(
  '/login',
  validateFieldsUser.checkFields,
  (req: Request, res: Response) => userController.verifyLogin(req, res),
);

export default teamRouter;
