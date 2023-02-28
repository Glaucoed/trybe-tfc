import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste de integração da teams', function () {

  afterEach(() => {
    sinon.restore();
  });

  it('Deve retornar uma lista de times e o status 200 utilizando a rota /teams', async function () {
    const outputMock = [
      {
        "id": 1,
        "teamName": "Avaí/Kindermann"
      },
      {
        "id": 2,
        "teamName": "Bahia"
      },
    ];

    const response = await chai.request(app).get('/teams').send(outputMock);

    expect(response.status).to.be.equal(200);

  });

  it('Deve retornar uma lista de times e o status 200 utilizando a rota /teams/5', async function () {
    const outputMock = {
      "id": 5,
      "teamName": "Cruzeiro"
    };

    const response = await chai.request(app).get('/teams/5').send(outputMock);

    expect(response.status).to.be.equal(200);

  });

})