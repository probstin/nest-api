import { NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { catchError, from, Observable } from "rxjs";
import { Repository } from "typeorm";
import { SettingsQueryDto } from "../dtos/settings-query.dto";
import { UpdateSettingDto } from "../dtos/update-setting.dto";
import { Setting } from "../entities/setting.entity";

export class SettingsService {

    constructor(@InjectRepository(Setting) private readonly settingsRepository: Repository<Setting>) { }

    getAllSettings(queryParams: SettingsQueryDto): Observable<Setting[]> {
        const query = this._generateQuery(queryParams);
        return from(this.settingsRepository.find(query));
    }

    getSettingById(settingId: number): Observable<Setting> {
        return from(this.settingsRepository.findOneOrFail(settingId))
            .pipe(catchError(() => { throw new NotFoundException(`Unable to find setting with ID: ${settingId}`) }));
    }

    updateSettingById(settingId: number, updateSettingDto: UpdateSettingDto): Observable<any> {
        return from(this.settingsRepository.update(settingId, updateSettingDto));
    }

    private _generateQuery(queryParams: SettingsQueryDto) {

        if (queryParams && Object.keys(queryParams).length) {

            const { isActive, type } = queryParams;

            if (isActive !== undefined && type !== undefined) return { isActive, type };

            if (isActive !== undefined && type == undefined) return { isActive };

            if (isActive == undefined && type !== undefined) return { type };

        }

        return null;
    }
}