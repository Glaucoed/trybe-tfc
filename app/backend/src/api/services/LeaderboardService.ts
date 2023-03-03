import { col, fn, literal, ModelStatic } from 'sequelize';
import TeamModel from '../../database/models/TeamModel';
import MatchesModel from '../../database/models/MatchesModel';

class LeaderboardService {
  protected matchesModel: ModelStatic<MatchesModel> = MatchesModel;
  protected teamModel: ModelStatic<TeamModel> = TeamModel;

  private query = {
    name: literal('homeTeam.team_name'),
    totalPoints: literal(`CAST((SUM(home_team_goals > away_team_goals) * 3) +
    SUM(home_team_goals = away_team_goals) AS UNSIGNED)`),
    totalGames: fn('COUNT', col('home_team_id')),
    totalVictories: literal('CAST(SUM(home_team_goals > away_team_goals) AS UNSIGNED)'),
    totalDraws: literal('CAST(SUM(home_team_goals = away_team_goals) AS UNSIGNED)'),
    totalLosses: literal('CAST(SUM(away_team_goals > home_team_goals) AS UNSIGNED)'),
    goalsFavor: literal('CAST(SUM(home_team_goals) AS UNSIGNED)'),
    goalsOwn: literal('CAST(SUM(away_team_goals) AS UNSIGNED)'),
    goalsBalance: literal('CAST(SUM(home_team_goals - away_team_goals) AS SIGNED )'),
    efficiency: literal(`ROUND((CAST((SUM(home_team_goals > away_team_goals) * 3) +
    SUM(home_team_goals = away_team_goals) AS UNSIGNED) /
    (COUNT(home_team_id) * 3)) * 100, 2)`),
  };

  async homeScore() {
    return this.matchesModel.findAll({
      include: [{ model: TeamModel, as: 'homeTeam', attributes: [] }],
      attributes: [[this.query.name, 'name'],
        [this.query.totalPoints, 'totalPoints'],
        [this.query.totalGames, 'totalGames'],
        [this.query.totalVictories, 'totalVictories'],
        [this.query.totalDraws, 'totalDraws'],
        [this.query.totalLosses, 'totalLosses'],
        [this.query.goalsFavor, 'goalsFavor'],
        [this.query.goalsOwn, 'goalsOwn'],
        [this.query.goalsBalance, 'goalsBalance'],
        [this.query.efficiency, 'efficiency']],
      where: { inProgress: false },
      group: ['home_team_id'],
      order: [['totalPoints', 'DESC'], ['totalVictories', 'DESC'], ['goalsBalance', 'DESC'],
        ['goalsFavor', 'DESC'], ['goalsOwn', 'DESC'],
      ],
    });
  }
}

export default LeaderboardService;
