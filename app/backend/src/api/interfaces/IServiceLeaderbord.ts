import IMatch from './IMatch';

export default interface IServiceLeaderbord {
  totalScore(): Promise<IMatch[]>
}
