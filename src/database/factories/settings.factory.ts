import { randBoolean, randDrinks } from "@ngneat/falso";
import { Setting } from "../../modules/settings/entities/setting.entity";
import { define } from "typeorm-seeding";

define(Setting, (): Setting => {
    const setting = new Setting();
    setting.name = randDrinks();
    setting.isActive = randBoolean();
    return setting;
});