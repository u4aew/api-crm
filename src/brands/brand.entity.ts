import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {Product} from '../products/product.entity';

@Entity()
export class Brand {
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
}
