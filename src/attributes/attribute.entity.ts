import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Attribute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
