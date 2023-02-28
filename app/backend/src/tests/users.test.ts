import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import IToken from '../api/interfaces/IToken'
import IUser from '../api/interfaces/IUser'
import UserModel from '../database/models/UserModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste de integração da rota users', function () {

  afterEach(() => {
    sinon.restore();
  });

  it('Deve realizar realizar o login e retornar o token e o status 200', async function () {

    const inputMock: IUser = {
      email: 'glauco@glauco.com',
      password: 'testes',
    }

    const tokenMock: IToken = {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc"
    }

    sinon.stub(UserModel, 'findOne').resolves()

    const response = await chai.request(app).post('/login').send(inputMock);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.equal(tokenMock);

  });

})