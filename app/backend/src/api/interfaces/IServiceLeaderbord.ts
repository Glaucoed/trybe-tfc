import IMatch from './IMatch';

export default interface IServiceLeaderbord {
  homeScore(): Promise<IMatch[]>
}
