import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ })
export class Image {
    @PrimaryGeneratedColumn()
    id: string;

    @Column('char', { nullable: false })
    cloudinaryId: string;

    @Column('text', { nullable: true })
    title: string;

    @Column('text', { array: true, nullable: false })
    tags: string[];
}