// import pino from "pino";

import { env } from "@dendron/common-all";

export class Logger {
  public name: string;
  public level: string;
  constructor(opts: { name: string; level: string }) {
    this.name = opts.name;
    this.level = opts.level;
  }
  _log(msg: any) {
    let ctx = "";
    if (msg.ctx) {
      ctx = msg.ctx;
    }
    // eslint-disable-next-line no-console
    console.log(this.name, ctx, msg);
  }
  info = (msg: any) => {
    this._log(msg);
  };
  error = (msg: any) => {
    this._log(msg);
  };
}

function createLogger(name?: string) {
  const level = env("LOG_LEVEL", { shouldThrow: false }) || "debug";
  const nameClean = name || env("LOG_NAME");
  // pino(
  //   pino.destination({
  //     dest: "./my-file",
  //     minLength: 4096, // Buffer before writing
  //     sync: false // Asynchronous logging
  //   })
  // );
  return new Logger({ name: nameClean, level });
  //return pino({ name: nameClean, level });
}

export { createLogger };

export function logAndThrow(logger: Logger, msg: any): never {
  logger.error(msg);
  throw JSON.stringify(msg);
}
