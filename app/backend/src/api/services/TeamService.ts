import { ModelStatic } from 'sequelize';
import TeamModel from '../../database/models/TeamModel';
import IServiceTeam from '../interfaces/IServiceTeam';
import ITeam from '../interfaces/ITeam';

class TeamService implements IServiceTeam {
  protected model: ModelStatic<TeamModel> = TeamModel;

  async readAll(): Promise<ITeam[]> {
    return this.model.findAll();
  }

  async findByTeam(id: number): Promise<ITeam> {
    const result = this.model.findByPk(id);
    return result as unknown as ITeam;
  }
}

export default TeamService;
