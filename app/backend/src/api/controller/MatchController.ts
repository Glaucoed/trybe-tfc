import { NextFunction, Request, Response } from 'express';
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

  async updateFinish(req: Request, res: Response) {
    const { id } = req.params;
    await this._service.updateFinish(+id);
    return res.status(200).json({ message: 'Finished' });
  }

  async updateGoals(req: Request, res: Response) {
    const { id } = req.params;
    await this._service.updateGoals(+id, { ...req.body });
    return res.status(200).json({ message: 'Finished' });
  }

  async insertMatch(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this._service.insertMatch({ ...req.body });
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default MatchController;
