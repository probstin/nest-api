import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Put, Query } from "@nestjs/common";
import { Observable } from "rxjs";
import { SettingsQueryDto } from "../dtos/settings-query.dto";
import { UpdateSettingDto } from "../dtos/update-setting.dto";
import { Setting } from "../entities/setting.entity";
import { SettingsService } from "../services/settings.service";

export enum ActiveState {
    ALL = 'all',
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}

@Controller('settings')
export class SettingsController {

    constructor(private settingsService: SettingsService) { }

    @Get('/')
    getAllSettings(@Query() queryParams: SettingsQueryDto): Observable<Setting[]> {
        return this.settingsService.getAllSettings(queryParams);
    }

    @Get('/:id')
    getSettingById(@Param('id', ParseIntPipe) id: number): Observable<Setting> {
        return this.settingsService.getSettingById(id);
    }

    @Put('/:id')
    updateSettingById(@Param('id', ParseIntPipe) id: number, @Body() updateSettingDto: UpdateSettingDto): Observable<Setting> {
        return this.settingsService.updateSettingById(id, updateSettingDto);
    }

}