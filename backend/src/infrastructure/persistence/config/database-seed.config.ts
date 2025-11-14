import { dataSourceOptions } from "./data-source.config";

const seedsConfig = {
  ...dataSourceOptions,
  factories: ["src/infrastructure/persistence/factories/*.factory.ts"],
  seeds: ["src/infrastructure/persistence/seeds/*.seeder.ts"],
};

export default seedsConfig;
