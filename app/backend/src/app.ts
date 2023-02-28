import * as express from 'express';
import teamRouter from './routes/TeamRouter';
import userRouter from './routes/UserRouter';
import ErrorHandler from './api/middleware/ErrorHandler';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.initRoutes();
    this.initMiddlewares();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private initRoutes(): void {
    this.app.use(teamRouter);
    this.app.use(userRouter);
  }

  private initMiddlewares() {
    this.app.use(ErrorHandler.handle);
    process.on('uncaughtException', (err) => {
      console.error('Erro não tratado:', err);
      // Encerrar o processo Node.js com um código de erro
      process.exit(1);
    });
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
