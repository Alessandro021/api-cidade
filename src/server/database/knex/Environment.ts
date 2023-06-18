import { Knex} from "knex";
import path from "path";
import "dotenv/config";

export const development:  Knex.Config = {
  client: "pg",
  connection: {

    host : process.env.HOST_DATABASE ,
    port : Number(process.env.PORT_DATABASE || 5432),
    user :  process.env.USER_DATABASE,
    password : String(process.env.PASSWORD_DATABASE),
    database : process.env.DATABASE,

  },
  migrations: {
    directory: path.resolve(__dirname, "..", "migrations")
  },
  seeds: {
    directory: path.resolve(__dirname, "..", "seeds")
  },
};

export const test: Knex.Config = {
  
  client: "sqlite3",
  useNullAsDefault: true,
  connection: ":memory:",
  // {
  //   filename: path.resolve("..", "..", "..", "..", "database.sqlite"),
  // },
  migrations: {
    directory: path.resolve(__dirname, "..", "migrations")
  },
  seeds: {
    directory: path.resolve(__dirname, "..", "seeds")
  },
  pool: {
    afterCreate: (connection: any, done: Function) => {
      connection.run("PRAGMA foreing_keys = ON");
      done();
    }
  }
};

export const production: Knex.Config = {
  ...development,
};