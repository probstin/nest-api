import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

export const config: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    entities: ['**/*.entity.{js,ts}'],
    migrations: ['src/database/migrations/*{.ts,.js}'],
    cli: { migrationsDir: 'src/database/migrations' },
    extra: { charset: 'utf8mb4_unicode_ci' },
    synchronize: false,
    logging: true
};

export default registerAs('database', () => config);