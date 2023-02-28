import { ModelStatic } from 'sequelize';
import * as bcryptjs from 'bcryptjs';
import UserModel from '../../database/models/UserModel';
import IServiceUser from '../interfaces/IServiceUser';
import IUser from '../interfaces/IUser';
import IToken from '../interfaces/IToken';
import JWTService from '../utils/JWT';
import 'dotenv/config';

import InvalidFieldsError from '../errors/InvalidFieldsError';
// private _jwtService: JWTService = new JWTService();

class UserService implements IServiceUser {
  protected model: ModelStatic<UserModel> = UserModel;

  private _secret = process.env.JWT_SECRET as string;

  private _jwtService: JWTService = new JWTService(this._secret);

  async verifyLogin(userInfo: IUser): Promise<IToken> {
    const user = await this.model.findOne({ where: { email: userInfo.email } });
    if (!user) throw new InvalidFieldsError('Invalid email or password');

    const pass = bcryptjs.compareSync(userInfo.password, user.password);
    if (!pass) throw new InvalidFieldsError('Invalid email or password');

    const token = this._jwtService.generateToken({ email: userInfo.email });

    return { token };
  }
}

export default UserService;
