import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable} from 'typeorm';
import {ProductOptionAttribute} from './product-option-attribute.entity';

@Entity()
export class ProductOption {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    price: number;

    @Column()
    available: boolean;

    @ManyToMany(type => ProductOptionAttribute, {cascade: true})
    @JoinTable()
    attributes: ProductOptionAttribute[];
}
