import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Category} from './category.entity';
import {Repository} from 'typeorm';

@Injectable()
export class CategoriesService {

    constructor(@InjectRepository(Category) private categoriesRepository: Repository<Category>) {
    }

    async getCategories(): Promise<Category[]> {
        return await this.categoriesRepository.find({
            select: ['id', 'name'],
        });
    }

    async getCategory(id: number) {
        return await this.categoriesRepository.findOne(id);
    }

    async createCategory(category: Category, file) {
        const data = parseCategory(category, file);
        return await this.categoriesRepository.save(data);
    }

    async updateCategory(category, file) {
        let data = parseCategory(category, file);

        if (category.removeImage) {
            data = {...data, ...{image: null}};
        }

        return this.categoriesRepository.update(category.id, data);
    }

    async deleteCategory(category: Category) {
        return await this.categoriesRepository.delete(category);
    }
}

const parseCategory = (category: Category, file) => {
    const {name, slug, description, parentId, shortDescription, metaTitle, metaDescription, metaKeywords} = category;
    let data = {
        name,
        slug,
        parentId,
        description,
        shortDescription,
        metaTitle,
        metaDescription,
        metaKeywords,
    };
    if (file) {
        data = {...data, ...{image: file.filename}};
    }
    return data;
};
