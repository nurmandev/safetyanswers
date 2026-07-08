import { config } from "../config";

type LogLevel = "info" | "warn" | "error" | "debug";

const colors: Record<LogLevel, string> = {
  info: "\x1b[36m",
  warn: "\x1b[33m",
  error: "\x1b[31m",
  debug: "\x1b[90m",
};

const reset = "\x1b[0m";

function formatMessage(level: LogLevel, message: string, meta?: Record<string, unknown>): string {
  const timestamp = new Date().toISOString();
  const color = colors[level];
  const metaStr = meta ? ` ${JSON.stringify(meta)}` : "";
  return `${color}[${timestamp}] [${level.toUpperCase()}]${reset} ${message}${metaStr}`;
}

export const logger = {
  info: (message: string, meta?: Record<string, unknown>) => {
    if (config.isDev) console.log(formatMessage("info", message, meta));
  },
  warn: (message: string, meta?: Record<string, unknown>) => {
    console.warn(formatMessage("warn", message, meta));
  },
  error: (message: string, meta?: Record<string, unknown>) => {
    console.error(formatMessage("error", message, meta));
  },
  debug: (message: string, meta?: Record<string, unknown>) => {
    if (config.isDev) console.log(formatMessage("debug", message, meta));
  },
};
