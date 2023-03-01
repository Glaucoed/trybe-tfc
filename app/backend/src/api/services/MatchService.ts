import { ModelStatic } from 'sequelize';
import TeamModel from '../../database/models/TeamModel';
import MatchesModel from '../../database/models/MatchesModel';
import IMatch from '../interfaces/IMatch';
import IServiceMatch from '../interfaces/IServiceMatch';

class MatchService implements IServiceMatch {
  protected model: ModelStatic<MatchesModel> = MatchesModel;

  async readAll(): Promise<IMatch[]> {
    return this.model.findAll({
      include: [
        { model: TeamModel, as: 'homeTeam' },
        { model: TeamModel, as: 'awayTeam' },
      ],
    });
  }
}

export default MatchService;
