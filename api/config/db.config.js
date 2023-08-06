module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "kumaran",
  PORT: 5432,
  DB: "srp",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
