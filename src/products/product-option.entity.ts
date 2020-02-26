import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import {Product} from './product.entity';
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
    available: string;

    @ManyToOne(type => Product, product => product.options)
    product: Product;

    @OneToMany(type => ProductOptionAttribute, productOptionAttribute => productOptionAttribute.productOption)
    attributes: ProductOptionAttribute[];
}
