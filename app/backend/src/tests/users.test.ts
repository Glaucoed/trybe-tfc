import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import IUser from '../api/interfaces/IUser';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste de integração da rota users', function () {

  afterEach(() => {
    sinon.restore();
  });

  it('Deve realizar realizar o login e retornar o token e o status 200', async function () {

    type Token = { token: string }
    type UserType = { email: string, password: string }

    const inputMock: UserType = {
      email: 'glauco@glauco.com',
      password: 'testes',
    }

    const tokenMock: Token = {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc"
    }

    const response = await chai.request(app).post('/login').send(inputMock);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.equal(tokenMock);

  });

})