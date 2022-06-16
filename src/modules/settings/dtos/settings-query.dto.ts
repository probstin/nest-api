import { Transform } from "class-transformer";
import { IsBoolean, IsEnum, IsOptional } from "class-validator";
import { SettingType } from "../entities/setting.entity";

export class SettingsQueryDto {
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => convertToBoolean(value))
    isActive?: boolean;

    @IsOptional()
    @IsEnum(SettingType)
    @Transform(({ value }) => SettingType[value])
    type?: SettingType;
}

const convertToBoolean = value => {

    if (value === true || value === 'true') return true;

    if (value === false || value === 'false') return false;

}