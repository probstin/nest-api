import { IsBoolean, IsNotEmpty } from "class-validator";

export class UpdateSettingDto {
    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean;
}