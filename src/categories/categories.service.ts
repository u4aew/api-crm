import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Category} from './category.entity';
import {Repository} from 'typeorm';

@Injectable()
export class CategoriesService {

    constructor(@InjectRepository(Category) private categoriesRepository: Repository<Category>) {}

    async getCategories(): Promise<Category[]> {
        return await this.categoriesRepository.manager.getTreeRepository(Category).findTrees();
    }

    async getCategory(id: number) {
        return await this.categoriesRepository.findOne(id);
    }

    async createCategory(category, file) {
        const data = parseDate(category, file);
        return await this.categoriesRepository.save(data);
    }

    async updateCategory(category, file) {
        let data = parseDate(category, file);

        if (category.removeImage) {
            data = {...data, ...{image: null}};
        }

        return this.categoriesRepository.update(category.id, data);
    }

    async deleteCategory(category: Category) {
        return await this.categoriesRepository.delete(category);
    }
}

const parseDate = (category, file) => {
    const {name, slug, description, shortDescription, metaTitle, parentId, metaDescription, metaKeywords} = category;
    let data = {
        name,
        slug,
        description,
        shortDescription,
        metaTitle,
        metaDescription,
        metaKeywords,
    };
    if (file) {
        data = {...data, ...{image: file.filename}};
    }
    if (parentId) {
        const parent = new Category();
        parent.id = parentId;
        data = {...data, ...{parent}};
    }
    return data;
};
