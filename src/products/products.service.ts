import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Product} from './product.entity';
import {Repository} from 'typeorm';

@Injectable()
export class ProductsService {

    constructor(@InjectRepository(Product) private productsRepository: Repository<Product>) {
    }

    async getProducts(): Promise<Product[]> {
        return await this.productsRepository.find({
            select: ['id', 'name'],
        });
    }

    async getProduct(id: number) {
        return await this.productsRepository.findOne(id);
    }

    async createProduct(product, file) {
        const data = parseData(product, file);
        return await this.productsRepository.save(data);
    }

    async updateProduct(product, file) {
        let data = parseData(product, file);

        if (product.removeImage) {
            data = {...data, ...{image: null}};
        }

        return this.productsRepository.update(product.id, data);
    }

    async deleteProduct(product: Product) {
        return await this.productsRepository.delete(product);
    }
}

const parseData = (category, file) => {
    const {name, slug, description, price, shortDescription, metaTitle, metaDescription, metaKeywords} = category;
    let data = {
        name,
        slug,
        price,
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
