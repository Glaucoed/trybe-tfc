import IToken from './IToken';
import IUser from './IUser';

export default interface IServiceUser {
  verifyLogin(userInput: IUser):Promise<IToken | IUser>
}
