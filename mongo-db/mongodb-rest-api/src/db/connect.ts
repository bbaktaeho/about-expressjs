import mongoose from "mongoose";
import config from "config";
import log from "../logger";

function connect() {
  const dbHost = config.get("dbHost") as string;

  return mongoose
    .connect(dbHost, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      log.info("database connected");
    })
    .catch(err => {
      log.error("db error", err);
      process.exit(1);
    });
}

export default connect;
