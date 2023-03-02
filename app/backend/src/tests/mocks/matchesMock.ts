import { Model } from "sequelize";
import IMatch from "../../api/interfaces/IMatch";
import IUser from "../../api/interfaces/IUser";
import TeamModel from "../../database/models/TeamModel";

interface IMatchesModel extends Model, IMatch { }

const outputListMock = [
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 2,
    "homeTeamId": 13,
    "homeTeamGoals": 1,
    "awayTeamId": 2,
    "awayTeamGoals": 1,
    "inProgress": true,
    "homeTeam": {
      "teamName": "Real Brasília"
    },
    "awayTeam": {
      "teamName": "Bahia"
    }
  }
] as IMatchesModel[]

const outputListTrueMock = [
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": true,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 2,
    "homeTeamId": 13,
    "homeTeamGoals": 1,
    "awayTeamId": 2,
    "awayTeamGoals": 1,
    "inProgress": true,
    "homeTeam": {
      "teamName": "Real Brasília"
    },
    "awayTeam": {
      "teamName": "Bahia"
    }
  }
] as IMatchesModel[]

const outputListFalseMock = [
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 2,
    "homeTeamId": 13,
    "homeTeamGoals": 1,
    "awayTeamId": 2,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "Real Brasília"
    },
    "awayTeam": {
      "teamName": "Bahia"
    }
  }
] as IMatchesModel[]

const inputMockGoals = { homeTeamGoals: 4, awayTeamGoals: 2 }

const message = { message: 'Finished' }

const validInputMock: IUser = { email: 'admin@admin.com', password: 'secret_admin', }

const outputCreateMock = {
  id: 52,
  homeTeamId: 1,
  awayTeamId: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
  inProgress: true
} as IMatchesModel

const inputCreateMock = {
  homeTeamId: 1,
  awayTeamId: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2
} as IMatchesModel

const invalidInputCreateMock = {
  homeTeamId: 1,
  awayTeamId: 1,
  homeTeamGoals: 2,
  awayTeamGoals: 2
} as IMatchesModel

const invalidInputTeamIdCreateMock = {
  homeTeamId: 999,
  awayTeamId: 999,
  homeTeamGoals: 2,
  awayTeamGoals: 2
} as IMatchesModel

const UnprocessableContentError = {
  message: 'It is not possible to create a match with two equal teams'
}
const outputMockTeam = { "id": 5, "teamName": "Cruzeiro" } as TeamModel;

export {
  outputMockTeam,
  UnprocessableContentError,
  inputMockGoals,
  outputListMock,
  validInputMock,
  outputListFalseMock,
  outputListTrueMock,
  message,
  outputCreateMock,
  inputCreateMock,
  invalidInputCreateMock,
  invalidInputTeamIdCreateMock,
}