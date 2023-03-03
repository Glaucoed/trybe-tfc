import { Request, Response } from 'express';
import IServiceLeaderbord from '../interfaces/IServiceLeaderbord';

class LeaderboardController {
  private _service: IServiceLeaderbord;

  constructor(service: IServiceLeaderbord) {
    this._service = service;
  }

  async homeScore(_req: Request, res: Response) {
    const data = await this._service.homeScore();

    res.status(200).json(data);
  }

  async awayScore(_req: Request, res: Response) {
    const data = await this._service.awayScore();

    res.status(200).json(data);
  }
}

export default LeaderboardController;
