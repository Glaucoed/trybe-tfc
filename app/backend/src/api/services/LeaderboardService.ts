import { col, fn, literal, ModelStatic } from 'sequelize';
import TeamModel from '../../database/models/TeamModel';
import MatchesModel from '../../database/models/MatchesModel';
import IMatch from '../interfaces/IMatch';

class LeaderboardService {
  protected matchesModel: ModelStatic<MatchesModel> = MatchesModel;
  protected teamModel: ModelStatic<TeamModel> = TeamModel;

  async homeScore(): Promise<IMatch[]> {
    return this.matchesModel.findAll({
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: [] }],
      attributes: [
        [literal('homeTeam.team_name'), 'name'],
        [literal(`
            CAST((SUM(home_team_goals > away_team_goals) * 3) + 
            SUM(home_team_goals = away_team_goals) AS UNSIGNED)`), 'totalPoints'],
        [fn('COUNT', col('home_team_id')), 'totalGames'],
        [literal('CAST(SUM(home_team_goals > away_team_goals) AS UNSIGNED)'), 'totalVictories'],
        [literal('CAST(SUM(home_team_goals = away_team_goals) AS UNSIGNED)'), 'totalDraws'],
        [literal('CAST(SUM(away_team_goals > home_team_goals) AS UNSIGNED)'), 'totalLosses'],
        [literal('CAST(SUM(home_team_goals) AS UNSIGNED)'), 'goalsFavor'],
        [literal('CAST(SUM(away_team_goals) AS UNSIGNED)'), 'goalsOwn'],
      ],
      where: { inProgress: false },
      group: ['home_team_id'],
    });
  }
}

export default LeaderboardService;
