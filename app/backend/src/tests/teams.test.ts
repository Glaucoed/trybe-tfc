import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import TeamModel from '../database/models/TeamModel';
import { outputListMock, outputMock } from './mocks/teamsMocks'

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste de integração da teams', function () {

  afterEach(() => {
    sinon.restore();
  });

  it('Deve retornar uma lista de times e o status 200 utilizando a rota /teams', async function () {
    sinon.stub(TeamModel, 'findAll').resolves(outputListMock)
    const response = await chai.request(app).get('/teams')

    expect(response.status).to.be.equal(200);

  });

  it('Deve retornar uma lista de times e o status 200 utilizando a rota /teams/5', async function () {
    sinon.stub(TeamModel, 'findByPk').resolves(outputMock)
    const response = await chai.request(app).get('/teams/5').send(outputMock);

    expect(response.status).to.be.equal(200);

  });

})