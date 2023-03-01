import IUser from "../../api/interfaces/IUser";


const validInputMock: IUser = { email: 'user@user.com', password: 'secret_user', }

const invalidEmailInputMock: IUser = { email: 'user@', password: 'secret_user', }

const invalidPasswordInputMock: IUser = { email: 'user@user.com', password: 'user', }

const notExistsPassword = { email: 'user@user.com' }

const notExistsEmail = { password: 'secret_user' }

export {
  validInputMock,
  invalidEmailInputMock,
  invalidPasswordInputMock,
  notExistsPassword,
  notExistsEmail,
}