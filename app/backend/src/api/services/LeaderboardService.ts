import { col, fn, literal, ModelStatic } from 'sequelize';
import TeamModel from '../../database/models/TeamModel';
import MatchesModel from '../../database/models/MatchesModel';
import IMatch from '../interfaces/IMatch';

class LeaderboardService {
  protected matchesModel: ModelStatic<MatchesModel> = MatchesModel;
  protected teamModel: ModelStatic<TeamModel> = TeamModel;

  async totalScore(): Promise<IMatch[]> {
    return this.matchesModel.findAll({
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: [] }],
      attributes: [
        [literal('homeTeam.team_name'), 'name'],
        [literal(`
        (SUM(home_team_goals > away_team_goals) * 3) + 
        SUM(home_team_goals = away_team_goals)`), 'totalPoints'],
        [fn('COUNT', col('home_team_id')), 'totalGames'],
        [fn('SUM', literal('home_team_goals > away_team_goals')), 'totalVictories'],
        [fn('SUM', literal('home_team_goals = away_team_goals')), 'totalDraws'],
        [fn('SUM', literal('away_team_goals > home_team_goals')), 'totalLosses'],
        [fn('SUM', col('home_team_goals')), 'goalsFavor'],
        [fn('SUM', col('away_team_goals')), 'goalsOwn'],
      ],
      where: { inProgress: false },
      group: ['home_team_id'],
    });
  }
}

export default LeaderboardService;
