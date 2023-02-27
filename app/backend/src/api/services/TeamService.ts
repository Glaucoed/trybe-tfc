import { ModelStatic } from 'sequelize';
import TeamModel from '../../database/models/TeamModel';
import IServiceTeam from '../interfaces/IServiceTeam';
import ITeam from '../interfaces/ITeam';

class PostService implements IServiceTeam {
  protected model: ModelStatic<TeamModel> = TeamModel;
  async readAll(): Promise<ITeam[]> {
    return this.model.findAll();
  }
}

export default PostService;
