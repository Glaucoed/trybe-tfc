import { Request, Response, NextFunction } from 'express';
import JWTService from '../utils/JWT';

const jwtService = new JWTService();

class authToken {
  public static authenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Token not found' });
    }

    try {
      const decoded = jwtService.verifyToken(authHeader);
      req.body = decoded;
      return next();
    } catch (err) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}

export default authToken;
