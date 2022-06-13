import { Setting } from "../../modules/settings/entities/setting.entity";
import { Connection, getManager } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export class SettingsSeed implements Seeder {

    public async run(factory: Factory, connection: Connection): Promise<void> {
        await getManager().query('TRUNCATE settings');
        await factory(Setting)().createMany(10);
    }

}