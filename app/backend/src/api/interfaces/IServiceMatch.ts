import IFinish from './IFinish';
import IMatch from './IMatch';

export default interface IServiceUser {
  readAll(): Promise<IMatch[]>
  readAllTrueOrFalse(inProgress: boolean): Promise<IMatch[]>
  updateFinish(id: number): Promise<IFinish>
}
