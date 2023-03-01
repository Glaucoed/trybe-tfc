import IMatch from './IMatch';

export default interface IServiceUser {
  readAll(): Promise<IMatch[]>
  readAllTrueOrFalse(inProgress: boolean): Promise<IMatch[]>
}
