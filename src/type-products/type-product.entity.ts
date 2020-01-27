import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class TypeProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
