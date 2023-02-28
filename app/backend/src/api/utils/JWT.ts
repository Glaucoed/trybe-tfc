import * as jwt from 'jsonwebtoken';

interface ITokenPayload {
  email: string;
}

// class JWTService {
//   private _secret = 'jwt_secret';

//   generateToken(payload: ITokenPayload): string {
//     const config: jwt.SignOptions = {
//       expiresIn: '3d',
//       algorithm: 'HS256',
//     };

//     const token = jwt.sign(payload, this._secret, config);
//     return token;
//   }

//   verifyToken(token: string): ITokenPayload {
//     const payload = jwt.verify(token, this._secret) as ITokenPayload;
//     return payload;
//   }
// }

class JWTService {
  private _secret: string;

  constructor(secret: string) {
    this._secret = secret;
  }

  generateToken(payload: ITokenPayload): string {
    const config: jwt.SignOptions = {
      expiresIn: '3d',
      algorithm: 'HS256',
    };

    const token = jwt.sign(payload, this._secret, config);
    return token;
  }

  verifyToken(token: string): ITokenPayload {
    const payload = jwt.verify(token, this._secret) as ITokenPayload;
    return payload;
  }
}

export default JWTService;
