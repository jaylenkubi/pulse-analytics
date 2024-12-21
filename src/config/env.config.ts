export const envConfig = () => ({
  database: {
    host: process.env.TIMESCALE_HOST || 'localhost',
    port: parseInt(process.env.TIMESCALE_PORT || '5432', 10),
    username: process.env.TIMESCALE_USER,
    password: process.env.TIMESCALE_PASSWORD,
    database: process.env.TIMESCALE_DB
  },
  redis: {
    host: process.env.DRAGONFLY_HOST || 'localhost',
    port: parseInt(process.env.DRAGONFLY_PORT || '6379', 10),
  }
}); 