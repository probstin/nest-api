import { NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { catchError, from, Observable } from "rxjs";
import { Repository } from "typeorm";
import { ActiveState } from "../controllers/settings.controller";
import { UpdateSettingDto } from "../dtos/update-setting.dto";
import { Setting } from "../entities/setting.entity";

export class SettingsService {

    constructor(@InjectRepository(Setting) private readonly settingsRepository: Repository<Setting>) { }

    getAllSettings(activeState: ActiveState): Observable<Setting[]> {
        const query = this._generateASQuery(activeState);
        return from(this.settingsRepository.find(query));
    }

    getSettingById(settingId: number): Observable<Setting> {
        return from(this.settingsRepository.findOneOrFail(settingId))
            .pipe(catchError(() => { throw new NotFoundException(`Unable to find setting with ID: ${settingId}`) }));
    }

    updateSettingById(settingId: number, updateSettingDto: UpdateSettingDto): Observable<any> {
        return from(this.settingsRepository.update(settingId, updateSettingDto));
    }

    private _generateASQuery(activeState: ActiveState) {
        switch (activeState) {
            case ActiveState.ACTIVE: return { isActive: true };
            case ActiveState.INACTIVE: return { isActive: false };
            default: return null;
        }
    }
}