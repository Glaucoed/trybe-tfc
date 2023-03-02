import { Router, Request, Response } from 'express';
import authToken from '../api/middleware/authToken';
import MatchController from '../api/controller/MatchController';
import MatchService from '../api/services/MatchService';

const matchRouter = Router();

const matchService = new MatchService();
const matchController = new MatchController(matchService);

matchRouter.get('/matches', (req: Request, res: Response) => matchController.readAll(req, res));
matchRouter.patch(
  '/matches/:id',
  authToken.authenticate,
  (req: Request, res: Response) => matchController.updateGoals(req, res),
);
matchRouter.patch(
  '/matches/:id/finish',
  authToken.authenticate,
  (req: Request, res: Response) => matchController.updateFinish(req, res),
);

export default matchRouter;
