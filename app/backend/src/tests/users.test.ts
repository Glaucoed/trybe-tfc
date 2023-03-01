import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

import {
  validInputMock,
  invalidEmailInputMock,
  invalidPasswordInputMock,
  notExistsEmail,
  notExistsPassword
} from './mocks/userMocks'

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste de integração da rota /users', function () {

  afterEach(() => {
    sinon.restore();
  });

  it('Deve realizar realizar o login e retornar o status 200', async function () {
    const response = await chai.request(app).post('/login').send(validInputMock);

    expect(response.status).to.be.equal(200);
  });

  it('Não deve realizar o login com o email errado e retornar o status 401', async function () {
    const response = await chai.request(app).post('/login').send(invalidEmailInputMock);

    expect(response.status).to.be.equal(401);
  });

  it('Não deve realizar o login com a senha errada e retornar o status 401', async function () {
    const response = await chai.request(app).post('/login').send(invalidPasswordInputMock);

    expect(response.status).to.be.equal(401);
  });

  it('Não deve realizar o login sem o email  e retornar o status 400', async function () {
    const response = await chai.request(app).post('/login').send(notExistsEmail);

    expect(response.status).to.be.equal(400);
  });

  it('Não deve realizar o login sem o password e retornar o status 400', async function () {
    const response = await chai.request(app).post('/login').send(notExistsPassword);

    expect(response.status).to.be.equal(400);
  });

})

describe('Teste de integração da rota /users/role', function () {

  afterEach(() => {
    sinon.restore();
  });

  it('Não deve realizar o login sem um autorization e retornar um 401', async function () {

    const responseLogin = await chai.request(app).post('/login').send(validInputMock);
    
    expect(responseLogin.body.token).to.not.be.empty;

    const token: string = responseLogin.body.token;
    
    const responseRole = await chai.request(app).get('/login/role').set('authorization',token).send(validInputMock);
    expect(responseRole.status).to.be.equal(200);
  });



})