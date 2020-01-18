import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import { Category } from './category.entity';
import {Repository} from 'typeorm';

@Injectable()
export class CategoriesService {

    constructor(@InjectRepository(Category) private categoriesRepository: Repository<Category>) { }
    async getCategories(): Promise<Category[]> {
        return await this.categoriesRepository.find({
            select: ['id', 'title'],
        });
    }

    async getCategory(id: number): Promise<Category[]> {
        return await this.categoriesRepository.find({
            where: [{ id }],
        });
    }
    async createCategory(category: Category) {
        return await this.categoriesRepository.save(category);
    }

    async updateCategory(category: Category) {
        this.categoriesRepository.update(category.id, category);
    }

    async deleteCategory(category: Category) {
        this.categoriesRepository.delete(category);
    }
}
