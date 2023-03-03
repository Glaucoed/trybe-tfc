import { col, fn, literal, ModelStatic } from 'sequelize';
import TeamModel from '../../database/models/TeamModel';
import MatchesModel from '../../database/models/MatchesModel';

class LeaderboardService {
  protected matchesModel: ModelStatic<MatchesModel> = MatchesModel;
  protected teamModel: ModelStatic<TeamModel> = TeamModel;

  private queryHome = (teamOne: string, teamTwo: string) => ({
    name: literal(`${teamOne}Team.team_name`),
    totalPoints: literal(`CAST((SUM(${teamOne}_team_goals > ${teamTwo}_team_goals) * 3) +
    SUM(${teamOne}_team_goals = ${teamTwo}_team_goals) AS UNSIGNED)`),
    totalGames: fn('COUNT', col(`${teamOne}_team_id`)),
    totalVictories: literal(`CAST(SUM(${teamOne}_team_goals > ${teamTwo}_team_goals) AS UNSIGNED)`),
    totalDraws: literal(`CAST(SUM(${teamOne}_team_goals = ${teamTwo}_team_goals) AS UNSIGNED)`),
    totalLosses: literal(`CAST(SUM(${teamTwo}_team_goals > ${teamOne}_team_goals) AS UNSIGNED)`),
    goalsFavor: literal(`CAST(SUM(${teamOne}_team_goals) AS UNSIGNED)`),
    goalsOwn: literal(`CAST(SUM(${teamTwo}_team_goals) AS UNSIGNED)`),
    goalsBalance: literal(`CAST(SUM(${teamOne}_team_goals - ${teamTwo}_team_goals) AS SIGNED )`),
    efficiency: literal(`ROUND((CAST((SUM(${teamOne}_team_goals > ${teamTwo}_team_goals) * 3) +
    SUM(${teamOne}_team_goals = ${teamTwo}_team_goals) AS UNSIGNED) /
    (COUNT(${teamOne}_team_id) * 3)) * 100, 2)`),
  });

  async LeaderboardScoreHomeAndAway(endpointTeam: string) {
    const otherType = endpointTeam === 'home' ? 'away' : 'home';

    const query = this.queryHome(endpointTeam, otherType);

    return this.matchesModel.findAll({
      include: [{ model: TeamModel, as: `${endpointTeam}Team`, attributes: [] }],
      attributes: [
        [query.name, 'name'], [query.totalPoints, 'totalPoints'],
        [query.totalGames, 'totalGames'], [query.totalVictories, 'totalVictories'],
        [query.totalDraws, 'totalDraws'], [query.totalLosses, 'totalLosses'],
        [query.goalsFavor, 'goalsFavor'], [query.goalsOwn, 'goalsOwn'],
        [query.goalsBalance, 'goalsBalance'], [query.efficiency, 'efficiency'],
      ],
      where: { inProgress: false },
      group: [`${endpointTeam}_team_id`],
      order: [['totalPoints', 'DESC'], ['totalVictories', 'DESC'], ['goalsBalance', 'DESC'],
        ['goalsFavor', 'DESC'], ['goalsOwn', 'DESC']],
    });
  }
}

export default LeaderboardService;
