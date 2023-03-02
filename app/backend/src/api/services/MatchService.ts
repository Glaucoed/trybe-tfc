import { ModelStatic } from 'sequelize';
import TeamModel from '../../database/models/TeamModel';
import MatchesModel from '../../database/models/MatchesModel';
import IMatch from '../interfaces/IMatch';
import IServiceMatch from '../interfaces/IServiceMatch';
import IGols from '../interfaces/IGols';
import UnprocessableContentError from '../errors/UnprocessableContentError';
import NotFoundError from '../errors/NotFoundError';

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
    const homeTeam = await this.model.findByPk(dto.homeTeamId);
    const awayTeam = await this.model.findByPk(dto.awayTeamId);

    if (!homeTeam || !awayTeam) throw new NotFoundError('There is no team with such id!');

    if (dto.homeTeamId === dto.awayTeamId) {
      throw new UnprocessableContentError(
        'It is not possible to create a match with two equal teams',
      );
    }
    return this.model.create({ ...dto, inProgress: true });
  }
}

export default MatchService;
