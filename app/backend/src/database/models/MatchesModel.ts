import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from './index';
import TeamModel from './TeamModel';

class MatchesModel extends Model {
  declare readonly id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchesModel.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    homeTeamId: {
      allowNull: false,
      type: INTEGER,
    },
    homeTeamGoals: {
      allowNull: false,
      type: INTEGER,
    },
    awayTeamId: {
      allowNull: false,
      type: INTEGER,
    },
    awayTeamGoals: {
      allowNull: false,
      type: INTEGER,
    },
    inProgress: {
      allowNull: false,
      type: BOOLEAN,
    },
  },
  {
    sequelize: db,
    underscored: true,
    timestamps: false,
    modelName: 'matches',
  },
);

MatchesModel.belongsTo(TeamModel, { foreignKey: 'home_team_id', as: 'homeTeam' });
MatchesModel.belongsTo(TeamModel, { foreignKey: 'away_team_id', as: 'awayTeam' });

TeamModel.hasMany(MatchesModel, { foreignKey: 'id', as: 'home_team_id' });
TeamModel.hasMany(MatchesModel, { foreignKey: 'id', as: 'away_team_id' });

export default MatchesModel;
