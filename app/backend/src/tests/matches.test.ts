import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchesModel from '../database/models/MatchesModel';
import {
  outputListMock,
  validInputMock,
  inputMockGoals,
  message,
  outputListFalseMock,
  outputListTrueMock,
  outputCreateMock,
  inputCreateMock,
  UnprocessableContentError,
  invalidInputTeamIdCreateMock,
  outputMockTeam,
  invalidInputCreateMock
} from './mocks/matchesMock';


chai.use(chaiHttp);

const { expect } = chai;


describe('Teste de integração da rota matches', function () {

  afterEach(() => {
    sinon.restore();
  });


  it('Deve retornar uma lista dos matches e o status 200 utilizando a rota /matches', async function () {

    sinon.stub(MatchesModel, 'findAll').resolves(outputListMock)
    const response = await chai.request(app).get('/matches')

    expect(response.status).to.be.equal(200);

  });


  it('Deve retornar uma lista dos matches e o status 200 utilizando a rota /matches?inProgress=true', async function () {

    sinon.stub(MatchesModel, 'findAll').resolves(outputListTrueMock)
    const response = await chai.request(app).get('/matches?inProgress=true')

    expect(response.status).to.be.equal(200);

  });

  it('Deve retornar uma lista dos matches e o status 200 utilizando a rota /matches?inProgress=false', async function () {

    sinon.stub(MatchesModel, 'findAll').resolves(outputListFalseMock)
    const response = await chai.request(app).get('/matches?inProgress=false')

    expect(response.status).to.be.equal(200);

  });


  it('Deve realizar o update sem um token, retorna o status 401 utilizando a rota /matches/1', async function () {

    sinon.stub(MatchesModel, 'update').resolves()
    const response = await chai.request(app).patch('/matches/1').send(inputMockGoals)
    expect(response.status).to.be.equal(401);
  });

  it('Deve realizar o update de gols de ambos times e retornar uma message de Finish e o status 200 utilizando a rota /matches/1', async function () {

    const responseLogin = await chai.request(app).post('/login').send(validInputMock);
    expect(responseLogin.body.token).to.not.be.empty;
    const token: string = responseLogin.body.token;

    sinon.stub(MatchesModel, 'update').resolves()

    const response = await chai.request(app).patch('/matches/1').set('authorization', token).send(inputMockGoals)

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(message)

  });

  it('Deve realizar o update para finalizar uma partida e retornar uma message de Finish e o status 200 utilizando a rota /matches/1/finish', async function () {

    const responseLogin = await chai.request(app).post('/login').send(validInputMock);
    expect(responseLogin.body.token).to.not.be.empty;
    const token: string = responseLogin.body.token;

    sinon.stub(MatchesModel, 'update').resolves()

    const response = await chai.request(app).patch('/matches/1/finish').set('authorization', token)

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(message)

  });

  it('Ao tentar realizar o insert sem o token deve retornar o status 401', async function () {

    sinon.stub(MatchesModel, 'create').resolves(inputCreateMock);

    const response = await chai.request(app).post('/matches').send(outputCreateMock)

    expect(response.status).to.be.equal(401);

  });

  it('Ao realizar o insert de uma partida e retornar o a partida inserida com o id e o status 200 utilizando a rota /matches', async function () {

    const responseLogin = await chai.request(app).post('/login').send(validInputMock);
    const token: string = responseLogin.body.token;

    sinon.stub(MatchesModel, 'create').resolves(inputCreateMock);

    const response = await chai.request(app).post('/matches').set('authorization', token).send(outputCreateMock)

    expect(response.status).to.be.equal(201);

  });

  it('Ao realizar o insert de uma partida em que os times nao exista deve retornar o status 404 utilizando a rota /matches', async function () {

    const responseLogin = await chai.request(app).post('/login').send(validInputMock);
    const token: string = responseLogin.body.token;


    sinon.stub(MatchesModel, 'findByPk').resolves(null);

    const response = await chai.request(app).post('/matches').set('authorization', token).send(invalidInputTeamIdCreateMock)
    
    expect(response.status).to.be.equal(404);

  });

  it('Ao realizar o insert de uma partida em que os times são iguais deve retornar o status 422 utilizando a rota /matches', async function () {

    const responseLogin = await chai.request(app).post('/login').send(validInputMock);
    const token: string = responseLogin.body.token;


    sinon.stub(MatchesModel, 'findByPk').resolves(outputMockTeam);

    const response = await chai.request(app).post('/matches').set('authorization', token).send(invalidInputCreateMock)

    expect(response.status).to.be.equal(422);
    expect(response.body).to.be.deep.equal(UnprocessableContentError);

  });
})