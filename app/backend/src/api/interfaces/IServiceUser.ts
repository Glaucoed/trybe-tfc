import IUser from './IUser';

export default interface IServiceUser {
  findOneUser(email: string, senha: string):Promise<IUser>
}
