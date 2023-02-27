import { Router, Request, Response } from 'express';
import TeamController from '../api/controller/TeamController';
import TeamService from '../api/services/TeamService';

const teamRoutes = Router();

const teamService = new TeamService();
const teamController = new TeamController(teamService);

teamRoutes.get('/team', (req: Request, res: Response) => teamController.readAll(req, res));

export default teamRoutes;
