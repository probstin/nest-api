import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum SettingType {
    STANDARD = 'STANDARD'
}

@Entity('settings')
export class Setting {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'enum', enum: SettingType, default: SettingType.STANDARD })
    type: SettingType;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @UpdateDateColumn()
    updatedOn: Date;

}