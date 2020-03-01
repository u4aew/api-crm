import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable} from 'typeorm';
import {ProductOptionAttribute} from './product-option-attribute.entity';

@Entity()
export class ProductOption {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({nullable: true})
    idXML: number;

    @Column()
    price: number;

    @Column({nullable: true})
    priceOld: number;

    @Column({default: false})
    major: boolean;

    @Column()
    available: boolean;

    @ManyToMany(type => ProductOptionAttribute, {cascade: true})
    @JoinTable()
    attributes: ProductOptionAttribute[];
}
