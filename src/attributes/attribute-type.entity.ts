import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {Attribute} from './attribute.entity';

@Entity()
export class AttributeType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Attribute, attribute => attribute.type)
    attributes: Attribute[];
}
