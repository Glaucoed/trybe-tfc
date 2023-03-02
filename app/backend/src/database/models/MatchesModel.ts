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
      field: 'home_team_id',
    },
    homeTeamGoals: {
      allowNull: false,
      type: INTEGER,
    },
    awayTeamId: {
      allowNull: false,
      type: INTEGER,
      field: 'away_team_id',
    },
    awayTeamGoals: {
      allowNull: false,
      type: INTEGER,
    },
    inProgress: {
      allowNull: true,
      defaultValue: true,
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

MatchesModel.belongsTo(TeamModel, { foreignKey: 'homeTeamId', as: 'homeTeam' });
MatchesModel.belongsTo(TeamModel, { foreignKey: 'awayTeamId', as: 'awayTeam' });

TeamModel.hasMany(MatchesModel, { foreignKey: 'homeTeamId', as: 'homeMatches' });
TeamModel.hasMany(MatchesModel, { foreignKey: 'awayTeamId', as: 'awayMatches' });

export default MatchesModel;
