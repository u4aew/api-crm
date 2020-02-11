import {Entity, Column, PrimaryGeneratedColumn, OneToMany, TreeChildren, TreeParent, Tree} from 'typeorm';
import {Product} from '../products/product.entity';

@Entity()
@Tree('materialized-path')
export class Category {
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

    @OneToMany(type => Product, product => product.category)
    products: Product[];

    @TreeChildren()
    children: Category[];

    @TreeParent()
    parent: Category;
}
