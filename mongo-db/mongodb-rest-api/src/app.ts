import express from "express";
import config from "config";
import log from "./logger";
import connect from "./db/connect";
import routes from "./routes";
import { deserializeUser } from "./middleware";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(deserializeUser);

app.listen(port, host, () => {
  log.info(`server listing at http://${host}:${port}`);

  connect();

  routes(app);
});
