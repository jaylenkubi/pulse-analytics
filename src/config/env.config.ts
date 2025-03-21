export const envConfig = () => ({
  database: {
    host: process.env.TIMESCALE_HOST || 'localhost',
    port: parseInt(process.env.TIMESCALE_PORT || '5432', 10),
    username: process.env.TIMESCALE_USER,
    password: process.env.TIMESCALE_PASSWORD,
    database: process.env.TIMESCALE_DB,
    ssl: process.env.DB_SSL === 'true'
  },
  dragonfly: {
    host: process.env.DRAGONFLY_HOST || 'localhost',
    port: parseInt(process.env.DRAGONFLY_PORT || '6379', 10)
  },
  queue: {
    host: process.env.QUEUE_REDIS_HOST || 'localhost',
    port: parseInt(process.env.QUEUE_REDIS_PORT || '6380', 10)
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET
  },
  nodeEnv: process.env.NODE_ENV || 'development',
}); 