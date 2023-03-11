const CONFIG = {
  DATABASE: {
    URI: process.env.MONGO_URI
  },
  SERVER: {
    PORT: parseInt(process.env.PORT, 10),
    ENV: process.env.NODE_ENV
  }
};

module.exports = CONFIG;
