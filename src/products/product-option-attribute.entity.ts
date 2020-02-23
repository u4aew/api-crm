import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import {ProductOption} from './product-option.entity';

@Entity()
export class ProductOptionAttribute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: string;

    @Column()
    attributeId: number;

    @ManyToOne(type => ProductOption, productOption => productOption.attributes)
    productOption: ProductOption;
}
