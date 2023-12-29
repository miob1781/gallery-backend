import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    id: string;

    @Column('char')
    cloudinaryId: string;

    @Column('char', { array: true })
    tags: string[];
}