import 'dotenv/config';
import { ModelStatic } from 'sequelize';
import * as bcryptjs from 'bcryptjs';
// import { z } from 'zod';
import UserModel from '../../database/models/UserModel';
import IServiceUser from '../interfaces/IServiceUser';
import IUser from '../interfaces/IUser';
import IToken from '../interfaces/IToken';
import JWTService from '../utils/JWT';

import UnauthorizedError from '../errors/UnauthorizedError';

class UserService implements IServiceUser {
  protected model: ModelStatic<UserModel> = UserModel;

  private _secret = process.env.JWT_SECRET as string;

  private _jwtService: JWTService = new JWTService(this._secret);

  async verifyLogin(userInfo: IUser): Promise<IToken> {
    const emailRegex = /^\S+@\S+\.\S+$/;
    const user = await this.model.findOne({ where: { email: userInfo.email } });
    console.log(user);

    if (!user || !emailRegex.test(userInfo.email)) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const pass = bcryptjs.compareSync(userInfo.password, user.password);
    if (!pass || userInfo.password.length < 6) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const token = this._jwtService.generateToken({ email: userInfo.email });

    return { token };
  }
}

export default UserService;
