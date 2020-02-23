import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import {Category} from '../categories/category.entity';
import {Brand} from '../brands/brand.entity';
import {ProductOption} from './product-option.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    slug: string;

    @Column({default: 0})
    price: number;

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

    @ManyToOne(type => Category, category => category.products)
    category: Category;

    @ManyToOne(type => Brand, brand => brand.products)
    brand: Brand;

    @OneToMany(type => ProductOption, productOption => productOption.product)
    options: ProductOption[];
}
