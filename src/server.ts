import express from 'express';
import cors from 'cors';
import http from 'http'

import { DatabaseManager } from './db/database-manager';
import { Logger } from './lib/logger';
import { SERVER_CONFIG } from './config';
import { initJobs } from './scheduler';
import { API } from './api';

export class Server {
  private readonly dbManager: DatabaseManager;
  private readonly api: API;
  private readonly app: express.Express;
  private readonly logger: Logger

  private server: http.Server | null = null;

  private readonly port: number;

  constructor(config: SERVER_CONFIG) {
    const app = express();
    this.api = new API();
    this.app = app;
    this.logger = new Logger();
    this.dbManager = new DatabaseManager(config.DATABASE.URI);
    this.port = config.SERVER.PORT;
    app.use(cors());
    app.use(this.api.getAPI());
  }

  listen() {
    this.server = this.app.listen(this.port, () => {
      console.log(`listening at http://localhost:${this.port}`);
    });
  }

  async run() {
    this.logger.setup();
    await this.dbManager.connect();
    initJobs();
    this.listen();
  }
}
