import app from "./app";
import { config } from "./config";
import { connectDatabase } from "./database";
import { logger } from "./utils/logger";

async function start() {
  await connectDatabase();

  app.listen(config.port, () => {
    logger.info(`Server running on port ${config.port} in ${config.nodeEnv} mode`);
    logger.info(`Health check: http://localhost:${config.port}/api/health`);
  });
}

start().catch((error) => {
  logger.error("Failed to start server", { error });
  process.exit(1);
});
