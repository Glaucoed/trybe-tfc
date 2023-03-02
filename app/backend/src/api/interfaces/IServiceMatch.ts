import IGols from './IGols';
import IMatch from './IMatch';

export default interface IServiceUser {
  readAll(): Promise<IMatch[]>
  readAllTrueOrFalse(inProgress: boolean): Promise<IMatch[]>
  updateFinish(id: number): Promise<void>
  updateGoals(id: number, dto: IGols): Promise<void>
}
