import * as jwt from 'jsonwebtoken';

interface ITokenPayload {
  email: string;
}

class JWTService {
  private secret = 'secret';

  generateToken(payload: ITokenPayload): string {
    const token = jwt.sign(payload, this.secret);
    return token;
  }

  verifyToken(token: string): ITokenPayload {
    const payload = jwt.verify(token, this.secret) as ITokenPayload;
    return payload;
  }
}

export default JWTService;
