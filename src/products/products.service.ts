import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Product} from './product.entity';
import {ProductOption} from './product-option.entity';
import {ProductOptionAttribute} from './product-option-attribute.entity';

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
        return await this.productsRepository.findOne(id, {relations: ['category']});
    }

    async createProduct(product: Product, file) {
        const data = parseData(product, file);
        const options = data.options;
        const saveData = await this.productsRepository.save(data);

        // Сохраняем конфигурации товара
        for (let item of options) {
            const productModel = new Product();
            productModel.id = saveData.id;
            item = {...item, ...{product: productModel}};
            const saveOption = await this.productsRepository.manager.getRepository(ProductOption).save(item);

            // Сохраняем атрибуты для конфигурации
            for (const element of item.attributes) {
                const {value, attributeId} = element;
                const productOption = new ProductOption();
                productOption.id = saveOption.id;
                await this.productsRepository.manager.getRepository(ProductOptionAttribute).save({
                    value,
                    attributeId,
                    productOption,
                });
            }
        }

        return saveData;
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

const parseData = (product, file) => {
    const {name, slug, description, price, shortDescription, metaTitle, metaDescription, metaKeywords, brand, category, options} = product;
    let data = {
        name,
        slug,
        price,
        description,
        shortDescription,
        metaTitle,
        metaDescription,
        metaKeywords,
        category,
        brand,
        options: JSON.parse(options),
    };
    if (file) {
        data = {...data, ...{image: file.filename}};
    }
    return data;
};
