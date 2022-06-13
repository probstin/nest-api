import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsController } from './controllers/settings.controller';
import { Setting } from './entities/setting.entity';
import { SettingsService } from './services/settings.service';

@Module({
    imports: [TypeOrmModule.forFeature([Setting])],
    controllers: [SettingsController],
    providers: [SettingsService]
})
export class SettingsModule { }
