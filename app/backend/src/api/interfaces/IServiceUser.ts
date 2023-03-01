import IRole from './IRole';
import IToken from './IToken';
import IUser from './IUser';

export default interface IServiceUser {
  verifyLogin(userInput: IUser):Promise<IToken | IUser>
  getRole(email: string):Promise<IRole>
}
