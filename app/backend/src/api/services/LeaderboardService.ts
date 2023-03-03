import { col, fn, literal, ModelStatic } from 'sequelize';
import TeamModel from '../../database/models/TeamModel';
import MatchesModel from '../../database/models/MatchesModel';

class LeaderboardService {
  protected matchesModel: ModelStatic<MatchesModel> = MatchesModel;
  protected teamModel: ModelStatic<TeamModel> = TeamModel;

  private queryHome = {
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

  private queryAway = {
    name: literal('awayTeam.team_name'),
    totalPoints: literal(`CAST((SUM(away_team_goals > home_team_goals) * 3) +
    SUM(away_team_goals = home_team_goals) AS UNSIGNED)`),
    totalGames: fn('COUNT', col('away_team_id')),
    totalVictories: literal('CAST(SUM(away_team_goals > home_team_goals) AS UNSIGNED)'),
    totalDraws: literal('CAST(SUM(away_team_goals = home_team_goals) AS UNSIGNED)'),
    totalLosses: literal('CAST(SUM(home_team_goals > away_team_goals ) AS UNSIGNED)'),
    goalsFavor: literal('CAST(SUM(away_team_goals) AS UNSIGNED)'),
    goalsOwn: literal('CAST(SUM(home_team_goals) AS UNSIGNED)'),
    goalsBalance: literal('CAST(SUM(away_team_goals - home_team_goals) AS SIGNED )'),
    efficiency: literal(`ROUND((CAST((SUM(away_team_goals > home_team_goals) * 3) +
    SUM(away_team_goals = home_team_goals) AS UNSIGNED) /
    (COUNT(away_team_id) * 3)) * 100, 2)`),
  };

  async homeScore() {
    return this.matchesModel.findAll({
      include: [{ model: TeamModel, as: 'homeTeam', attributes: [] }],
      attributes: [[this.queryHome.name, 'name'],
        [this.queryHome.totalPoints, 'totalPoints'],
        [this.queryHome.totalGames, 'totalGames'],
        [this.queryHome.totalVictories, 'totalVictories'],
        [this.queryHome.totalDraws, 'totalDraws'],
        [this.queryHome.totalLosses, 'totalLosses'],
        [this.queryHome.goalsFavor, 'goalsFavor'],
        [this.queryHome.goalsOwn, 'goalsOwn'],
        [this.queryHome.goalsBalance, 'goalsBalance'],
        [this.queryHome.efficiency, 'efficiency']],
      where: { inProgress: false },
      group: ['home_team_id'],
      order: [['totalPoints', 'DESC'], ['totalVictories', 'DESC'], ['goalsBalance', 'DESC'],
        ['goalsFavor', 'DESC'], ['goalsOwn', 'DESC'],
      ],
    });
  }

  async awayScore() {
    return this.matchesModel.findAll({
      include: [{ model: TeamModel, as: 'awayTeam', attributes: [] }],
      attributes: [[this.queryAway.name, 'name'],
        [this.queryAway.totalPoints, 'totalPoints'],
        [this.queryAway.totalGames, 'totalGames'],
        [this.queryAway.totalVictories, 'totalVictories'],
        [this.queryAway.totalDraws, 'totalDraws'],
        [this.queryAway.totalLosses, 'totalLosses'],
        [this.queryAway.goalsFavor, 'goalsFavor'],
        [this.queryAway.goalsOwn, 'goalsOwn'],
        [this.queryAway.goalsBalance, 'goalsBalance'],
        [this.queryAway.efficiency, 'efficiency']],
      where: { inProgress: false },
      group: ['away_team_id'],
      order: [['totalPoints', 'DESC'], ['totalVictories', 'DESC'], ['goalsBalance', 'DESC'],
        ['goalsFavor', 'DESC'], ['goalsOwn', 'DESC'],
      ],
    });
  }
}

export default LeaderboardService;
