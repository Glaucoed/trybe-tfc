import { Request, Response } from 'express';
import IServiceUser from '../interfaces/IServiceUser';

class UserController {
  private _service: IServiceUser;

  constructor(service: IServiceUser) {
    this._service = service;
  }

  async verifyLogin(req: Request, res: Response) {
    const token = await this._service.verifyLogin(req.body);
    console.log(token);

    return res.status(200).json(token);
  }
}

export default UserController;
