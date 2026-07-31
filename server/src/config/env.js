const DEFAULT_MAX_JSON_SIZE = "1mb";

export const config = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  clientOrigin: process.env.CLIENT_ORIGIN || "*",
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  maxJsonSize: process.env.MAX_JSON_SIZE || DEFAULT_MAX_JSON_SIZE,
  groqApiKey: process.env.GROQ_API_KEY,
};

export function assertRequiredEnv() {
  const required = ["DATABASE_URL", "JWT_SECRET"];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variable(s): ${missing.join(", ")}`);
  }
}
