import app from "./app";
import config from "./config";

const { PORT, HOST, ENV } = config;

const server = app.listen(PORT, () => {
  console.log(`App is running at: ${HOST}:${PORT} in ${ENV} mode.`);
  console.log("  Press CTRL-C to stop\n");
});

export default server;
