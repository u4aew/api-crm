import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany} from 'typeorm';
import {Attribute} from '../attributes/attribute.entity';
import {Product} from '../products/product.entity';

@Entity()
export class TypeProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(type => Attribute)
    @JoinTable()
    attributes: Attribute[];

    @ManyToMany(type => Product)
    products: Product[];
}
