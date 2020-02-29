import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class ProductOptionAttribute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: string;

    @Column()
    attributeId: number;
}
