import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

interface ITokenPayload {
  email: string;
}

class JWTService {
  private _secret = process.env.JWT_SECRET as string;

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
