import IMatch from './IMatch';

export default interface IServiceLeaderbord {
  LeaderboardScoreHomeAndAway(endpointTeam: string): Promise<IMatch[]>
}
