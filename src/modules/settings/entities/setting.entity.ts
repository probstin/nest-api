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