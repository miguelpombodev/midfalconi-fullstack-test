import { DataSource, DataSourceOptions } from "typeorm";

import "dotenv/config";

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

  entities: ["src/core/**/*.entity.ts"],
  migrations: ["src/infrastructure/persistence/migrations/*.ts"],
  synchronize: false,
  logging: true,
  logger: "formatted-console",
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
