import IMatch from './IMatch';

export default interface IServiceUser {
  readAll(): Promise<IMatch[]>
}
