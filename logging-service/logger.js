// logger.js
import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.json()
  ),
  transports: [
    new transports.File({ filename: "logs/user-service-error.log", level: "error" }),
    new transports.File({ filename: "logs/user-service-combined.log" }),
    new transports.Console()
  ],
});

export default logger;
