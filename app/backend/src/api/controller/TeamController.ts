import { Request, Response } from 'express';
import IServiceTeam from '../interfaces/IServiceTeam';

class TeamController {
  private _service: IServiceTeam;

  constructor(service: IServiceTeam) {
    this._service = service;
  }

  async readAll(_req: Request, res: Response) {
    const result = await this._service.readAll();
    return res.status(200).json(result);
  }

  async findByTeam(req: Request, res: Response) {
    const { id } = req.params;

    console.log(id);

    const result = await this._service.findByTeam(+id);

    console.log(result);

    return res.status(200).json(result);
  }
}

export default TeamController;
