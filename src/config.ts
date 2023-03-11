export type SERVER_CONFIG = {
    DATABASE: {
        URI: string
    },
    SERVER: {
        PORT: number,
        ENV: string
    }
}
export const CONFIG: SERVER_CONFIG = {
  DATABASE: {
    URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/your-db-name'
  },
  SERVER: {
    PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    ENV: process.env.NODE_ENV || 'local'
  }
};
