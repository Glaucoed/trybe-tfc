import { Request, Response } from 'express';
import IServiceLeaderbord from '../interfaces/IServiceLeaderbord';

class LeaderboardController {
  private _service: IServiceLeaderbord;

  constructor(service: IServiceLeaderbord) {
    this._service = service;
  }

  async homeScore(req: Request, res: Response) {
    const endpointTeam = req.route.path.split('/')[2];
    const data = await this._service.LeaderboardScoreHomeAndAway(endpointTeam);

    res.status(200).json(data);
  }

  // async awayScore(_req: Request, res: Response) {
  //   const data = await this._service.awayScore();

  //   res.status(200).json(data);
  // }
}

export default LeaderboardController;
