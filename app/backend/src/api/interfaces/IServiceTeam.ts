import ITeam from './ITeam';

export default interface IServiceTeam {
  readAll(): Promise<ITeam[]>
}
