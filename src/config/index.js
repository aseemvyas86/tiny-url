// Load all available configurations
import localConfig from "./config.local.js";
import devConfig from "./config.dev.js";
import qaConfig from "./config.qa.js";
import prodConfig from "./config.prod.js";

const config = {
  version: "1.0.0"
};

// Pick which config gets appended
switch (process.env.REACT_APP_ENV.toUpperCase()) {
  case "LOCAL":
    Object.assign(config, localConfig);
    break;
  case "DEV":
    Object.assign(config, devConfig);
    break;
  case "QA":
    Object.assign(config, qaConfig);
    break;
  case "PROD":
    Object.assign(config, prodConfig);
    break;
  default:
    console.error(`Unknown config specified: ${process.env.REACT_APP_ENV}`);
    break;
}

export default config;
