/* eslint-disable max-lines-per-function */
import { col, fn, literal, ModelStatic } from 'sequelize';
import TeamModel from '../../database/models/TeamModel';
import MatchesModel from '../../database/models/MatchesModel';

class LeaderboardService {
  protected matchesModel: ModelStatic<MatchesModel> = MatchesModel;
  protected teamModel: ModelStatic<TeamModel> = TeamModel;

  private _name = literal('homeTeam.team_name');
  private _totalPoints = literal(`CAST((SUM(home_team_goals > away_team_goals) * 3) +
  SUM(home_team_goals = away_team_goals) AS UNSIGNED)`);

  private _totalGames = fn('COUNT', col('home_team_id'));
  private _totalVictories = literal('CAST(SUM(home_team_goals > away_team_goals) AS UNSIGNED)');
  private _totalDraws = literal('CAST(SUM(home_team_goals = away_team_goals) AS UNSIGNED)');
  private _totalLosses = literal('CAST(SUM(away_team_goals > home_team_goals) AS UNSIGNED)');
  private _goalsFavor = literal('CAST(SUM(home_team_goals) AS UNSIGNED)');
  private _goalsOwn = literal('CAST(SUM(away_team_goals) AS UNSIGNED)');
  private _goalsBalance = literal('CAST(SUM(home_team_goals - away_team_goals) AS SIGNED )');
  private _efficiency = literal(`ROUND((CAST((SUM(home_team_goals > away_team_goals) * 3) +
  SUM(home_team_goals = away_team_goals) AS UNSIGNED) /
  (COUNT(home_team_id) * 3)) * 100, 2)`);

  async homeScore() {
    return this.matchesModel.findAll({
      include: [{ model: TeamModel, as: 'homeTeam', attributes: [] }],
      attributes: [[this._name, 'name'],
        [this._totalPoints, 'totalPoints'],
        [this._totalGames, 'totalGames'],
        [this._totalVictories, 'totalVictories'],
        [this._totalDraws, 'totalDraws'],
        [this._totalLosses, 'totalLosses'],
        [this._goalsFavor, 'goalsFavor'],
        [this._goalsOwn, 'goalsOwn'],
        [this._goalsBalance, 'goalsBalance'],
        [this._efficiency, 'efficiency']],
      where: { inProgress: false },
      group: ['home_team_id'],
      order: [['totalVictories', 'DESC'], ['goalsBalance', 'DESC'], ['goalsFavor', 'DESC'],
        ['goalsOwn', 'DESC'],
      ],
    });
  }
}

export default LeaderboardService;
