import ITeam from './ITeam';

export default interface IServiceTeam {
  readAll(): Promise<ITeam[]>
  findByTeam(id: number): Promise<ITeam>
}
