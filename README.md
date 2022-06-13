# Migrations & Seeders with TypeORM

## Migrations

### Pre-Requisites

This guide assumes that you already have a NestJS app up and running with TypeORM configured.

### 1) Install Required Dependencies

- `@nestjs/typeorm` > `8.0.3`
- `typeorm` > `0.2.45`
- `typeorm-seeding` > latest version
- `@ngneat/falso` > latest version

### 2) Establish Configs

You'll have to export an additional, static config for the TypeORM CLI to find when running migrations.

```typescript
// src/config/typeorm.config.ts

import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
    cli: { migrationsDir: __dirname + '/../database/migrations' },
    extra: { charset: 'utf8mb4_unicode_ci' },
    synchronize: false,
    logging: true,
};

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (): Promise<TypeOrmModuleOptions> => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
        cli: { migrationsDir: __dirname + '/../database/migrations' },
        extra: { charset: 'utf8mb4_unicode_ci' },
        synchronize: false,
        logging: true,
    }),
};
```

```typescript
// src/config/typeorm-migrations.config.ts

import { typeOrmConfig } from "./typeorm.config";

export = typeOrmConfig;
```

### 2) Add Scripts to `package.json`

Wire in the scripts that actually interface with the TypeORM and TypeORM Seeding CLI.

**Be sure to double-check the path to your `typeorm-migrations.config.ts` file**
```json
{
  "typeorm:cli": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli -f src/config/typeorm-migrations.config.ts",
  "migration:generate": "npm run typeorm:cli -- migration:generate -d src/database/migrations -n",
  "migration:create": "npm run typeorm:cli -- migration:create -d src/database/migrations -n",
  "migration:run": "npm run typeorm:cli -- migration:run",
  "migration:revert": "npm run typeorm:cli -- migration:revert",
  "seed:config": "ts-node ./node_modules/typeorm-seeding/dist/cli.js config -n src/config/typeorm-migrations.config.ts",
  "seed:run": "ts-node ./node_modules/typeorm-seeding/dist/cli.js seed -n src/config/typeorm-migrations.config.ts",
  "db:refresh": "npm run typeorm:cli schema:drop && npm run migration:run && npm run seed:run"
}
```

### 3) Create Some Entities

```typescript
// src/modules/settings/entities/setting.entity.ts

import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('settings')
export class Setting {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @UpdateDateColumn()
    updatedOn: Date;

}
```

### 4) Generate & Run the Migrations

With Entities in your project, you can now generate migrations and have them auto-generated!

`npm run migration:generate -- <NAME_YOUR_MIGRATION>`

If you've followed the configuration above, your migration should land in `src/database/migrations/`

With the migration generated, you can now run it against the database!

`npm run migration:run`

## Seeders

### 1) Load your Configuration with TypeORM Seeding

`npm run seed:config`

### 2) Create Some Seeders

Create a `src/database/seeds` directory that corresponds with the `seeds` directory returned from the command in `Seeders > 1`.

Create a `settings.seed.ts` file:

```typescript
// src/database/seeds/settings.seed.ts

import { Setting } from "../../modules/settings/entities/setting.entity"; // make sure this path stays relative
import { Connection, getManager } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export class SettingsSeed implements Seeder {

    public async run(factory: Factory, connection: Connection): Promise<void> {
        await getManager().query('TRUNCATE settings');
        await factory(Setting)().createMany(10);
    }

}
```

### 3) Create Some Factories

Create a `src/database/factories` directory that corresponds with the `factories` directory returned from the command in `Seeders > 1`.

Create a `settings.factory.ts` file:

```typescript
// src/database/factories/settings.factory.ts

import { Setting } from "../../modules/settings/entities/setting.entity"; // make sure this path stays relative
import { randBoolean, randDrinks } from "@ngneat/falso";
import { define } from "typeorm-seeding";

define(Setting, (): Setting => {
    const setting = new Setting();
    setting.name = randDrinks();
    setting.isActive = randBoolean();
    return setting;
});
```

Check out Falso's documentation. They have a **TON** of other fun mock data.

### 4) Run the Seeds!

`npm run seed:run`