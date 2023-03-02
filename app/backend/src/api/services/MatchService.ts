import { ModelStatic } from 'sequelize';
import TeamModel from '../../database/models/TeamModel';
import MatchesModel from '../../database/models/MatchesModel';
import IMatch from '../interfaces/IMatch';
import IFinish from '../interfaces/IFinish';
import IServiceMatch from '../interfaces/IServiceMatch';

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

  async updateFinish(id: number): Promise<IFinish> {
    await this.model.update({ inProgress: false }, { where: { id } });
    return { message: 'Testes' };
  }
}

export default MatchService;
