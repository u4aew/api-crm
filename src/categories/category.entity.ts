import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  parentId: number;

  @Column()
  slug: string;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column()
  description: string;

  @Column()
  shortDescription: string;

  @Column()
  metaTitle: string;

  @Column()
  metaKeywords: string;
}
