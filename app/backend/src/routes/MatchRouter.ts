import { Router, Request, Response } from 'express';
import MatchController from '../api/controller/MatchController';
import MatchService from '../api/services/MatchService';

const matchRouter = Router();

const matchService = new MatchService();
const matchController = new MatchController(matchService);

matchRouter.get('/matches', (req: Request, res: Response) => matchController.readAll(req, res));

export default matchRouter;
