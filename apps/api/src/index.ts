import 'dotenv/config';
import express, { type RequestHandler, type Request, type Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { router as queueRouter } from './routes/queue';

const logger = pino({
  level: process.env.LOG_LEVEL ?? 'info',
});

const app = express();

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') ?? '*',
    credentials: true,
  })
);

app.use(express.json());
const createHttpLogger = pinoHttp as unknown as (opts: unknown) => RequestHandler;

const httpLogger = createHttpLogger({
  logger,
  customLogLevel: (_req: Request, res: Response, err?: unknown) => {
    if (res.statusCode >= 500 || err) return 'error';
    if (res.statusCode >= 400) return 'warn';
    return 'info';
  },
});

app.use(httpLogger);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.use('/api', queueRouter);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error({ err }, 'Unhandled error');
  res.status(500).json({ error: 'Internal Server Error' });
});

const port = Number(process.env.PORT ?? 4000);

app.listen(port, () => {
  logger.info(`API server listening on port ${port}`);
});
