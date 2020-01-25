import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Brand} from './brand.entity';
import {Repository} from 'typeorm';

@Injectable()
export class BrandsService {
    constructor(@InjectRepository(Brand) private brandsRepository: Repository<Brand>) {
    }

    async getBrands(): Promise<Brand[]> {
        return await this.brandsRepository.find({
            select: ['id', 'name'],
        });
    }

    async getBrand(id: number) {
        return await this.brandsRepository.findOne(id);
    }

    async createBrand(brand, file) {
        const data = parseBrand(brand, file);
        return await this.brandsRepository.save(data);
    }

    async updateBrand(brand, file) {
        let data = parseBrand(brand, file);

        if (brand.removeImage) {
            data = {...data, ...{image: null}};
        }

        return this.brandsRepository.update(brand.id, data);
    }

    async deleteBrand(brand: Brand) {
        return await this.brandsRepository.delete(brand);
    }
}

const parseBrand = (category, file) => {
    const {name, slug, description, shortDescription, metaTitle, metaDescription, metaKeywords} = category;
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

    return data;
};
