import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable} from 'typeorm';
import {Category} from '../categories/category.entity';
import {Brand} from '../brands/brand.entity';
import {ProductOption} from './product-option.entity';
import {TypeProduct} from '../type-products/type-product.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    slug: string;

    @Column()
    name: string;

    @Column({nullable: true})
    image: string;

    @Column({nullable: true})
    description: string;

    @Column({nullable: true})
    shortDescription: string;

    @Column({nullable: true})
    metaTitle: string;

    @Column({nullable: true})
    metaKeywords: string;

    @Column({nullable: true})
    metaDescription: string;

    @ManyToOne(type => TypeProduct)
    @JoinTable()
    type: TypeProduct;

    @ManyToOne(type => Category, category => category.products)
    @JoinTable()
    category: Category;

    @ManyToOne(type => Brand)
    @JoinTable()
    brand: Brand;

    @ManyToMany(type => ProductOption, {cascade: true})
    @JoinTable()
    productOptions: ProductOption[];

}
