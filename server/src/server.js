import "dotenv/config";

import app from "./app.js";
import { assertRequiredEnv, config } from "./config/env.js";

assertRequiredEnv();

app.listen(config.port, () => {
  console.log(`StudyFlow API is running on http://localhost:${config.port}`);
});
