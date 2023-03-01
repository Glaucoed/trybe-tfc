import { ModelStatic } from 'sequelize';
import * as bcryptjs from 'bcryptjs';
import UserModel from '../../database/models/UserModel';
import IServiceUser from '../interfaces/IServiceUser';
import IUser from '../interfaces/IUser';
import IToken from '../interfaces/IToken';
import JWTService from '../utils/JWT';

import UnauthorizedError from '../errors/UnauthorizedError';
import IRole from '../interfaces/IRole';

class UserService implements IServiceUser {
  protected model: ModelStatic<UserModel> = UserModel;

  private _jwtService: JWTService = new JWTService();

  async verifyLogin(userInfo: IUser): Promise<IToken> {
    const emailRegex = /^\S+@\S+\.\S+$/;
    const user = await this.model.findOne({ where: { email: userInfo.email } });

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

  async getRole(email: string): Promise<IRole> {
    const role = await this.model.findOne({ where: { email } }) as IUser;
    return role as unknown as IRole;
  }
}

export default UserService;
