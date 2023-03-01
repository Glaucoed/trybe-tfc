import { Request, Response } from 'express';
import IServiceMatch from '../interfaces/IServiceMatch';

class MatchController {
  private _service: IServiceMatch;

  constructor(service: IServiceMatch) {
    this._service = service;
  }

  async readAll(req: Request, res: Response) {
    if (req.query.inProgress) {
      const resultTrueOrFalse = await this._service
        .readAllTrueOrFalse(JSON.parse(req.query.inProgress as string));

      return res.status(200).json(resultTrueOrFalse);
    }
    const result = await this._service.readAll();

    return res.status(200).json(result);
  }
}

export default MatchController;
