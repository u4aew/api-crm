import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

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
}
