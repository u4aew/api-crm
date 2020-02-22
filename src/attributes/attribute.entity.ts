import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable} from 'typeorm';
import {AttributeType} from './attribute-type.entity';

@Entity()
export class Attribute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({nullable: true})
    unit: string;

    @Column()
    isFilter: boolean;

    @Column()
    required: boolean;

    @Column({nullable: true})
    optionRaw: string;
    @ManyToOne(type => AttributeType, attributeType => attributeType.attributes)
    @JoinTable()
    type: AttributeType;
}
