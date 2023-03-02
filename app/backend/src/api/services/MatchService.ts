import { ModelStatic } from 'sequelize';
import TeamModel from '../../database/models/TeamModel';
import MatchesModel from '../../database/models/MatchesModel';
import IMatch from '../interfaces/IMatch';
import IServiceMatch from '../interfaces/IServiceMatch';
import IGols from '../interfaces/IGols';

class MatchService implements IServiceMatch {
  protected model: ModelStatic<MatchesModel> = MatchesModel;

  async readAll(): Promise<IMatch[]> {
    return this.model.findAll({
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
  }

  async readAllTrueOrFalse(inProgress: boolean): Promise<IMatch[]> {
    return this.model.findAll({
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
      where: { inProgress },
    });
  }

  async updateFinish(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  async updateGoals(id: number, dto: IGols): Promise<void> {
    const { homeTeamGoals, awayTeamGoals } = dto;
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  async insertMatch(dto: IMatch): Promise<IMatch> {
    const newMatch = await this.model.create({ ...dto });

    return {
      id: newMatch.id,
      homeTeamId: newMatch.homeTeamId,
      homeTeamGoals: newMatch.homeTeamGoals,
      awayTeamId: newMatch.awayTeamId,
      awayTeamGoals: newMatch.awayTeamGoals,
      inProgress: newMatch.inProgress as boolean,
    };
  }
}

export default MatchService;
