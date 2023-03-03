import { Request, Response } from 'express';
import IHomeScore from '../interfaces/IHomeScore';
import IServiceLeaderbord from '../interfaces/IServiceLeaderbord';

class LeaderboardController {
  private _service: IServiceLeaderbord;

  constructor(service: IServiceLeaderbord) {
    this._service = service;
  }

  async allScore(_req: Request, res: Response) {
    const data = await this._service.totalScore() as unknown as IHomeScore[];
    console.log(data);

    // const convertedData = data.map((obj) => ({
    //   name: obj.name,
    //   totalPoints: +obj.totalPoints,
    //   totalGames: Number(obj.totalGames),
    //   totalVictories: Number(obj.totalVictories),
    //   totalDraws: Number(obj.totalDraws),
    //   totalLosses: Number(obj.totalLosses),
    //   goalsFavor: Number(obj.goalsFavor),
    //   goalsOwn: Number(obj.goalsOwn),
    // }));
    res.status(200).json(data);
  }
}

export default LeaderboardController;
