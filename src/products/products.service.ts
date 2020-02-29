import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Product} from './product.entity';
import {ProductOption} from './product-option.entity';
import {ProductOptionAttribute} from './product-option-attribute.entity';
import {Repository} from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product) private productsRepository: Repository<Product>,
    ) {
    }

    async getProducts(): Promise<Product[]> {
        return await this.productsRepository.find({
            select: ['id', 'name'],
        });
    }

    async getProduct(id: number) {
        const product = await this.productsRepository.findOne(id, {
            relations: ['category', 'type', 'brand', 'productOptions'],
        });
        const arr = [];
        for (let productOption of product.productOptions) {
            const item = await this.productsRepository.manager
                .getRepository(ProductOption)
                .findOne(productOption.id, {relations: ['attributes']});
            productOption = {...productOption, ...{attributes: item.attributes}};
            arr.push(productOption);
        }
        product.productOptions = arr;
        return product;
    }

    async createProduct(product: Product, file) {
        const data = parseData(product, file);
        return await this.productsRepository.save(data);
    }

    async createProductOption(form) {
        const {title, available, price, productId} = form;
        const productOption = await this.productsRepository.manager
            .getRepository(ProductOption)
            .save({title, available, price});

        await this.productsRepository.manager.query(
            `INSERT INTO product_product_options_product_option (productId, productOptionId)VALUES (${productId}, ${productOption.id});`,
        );

        productOption.attributes = [];

        for (const item of JSON.parse(form.attributes)) {
            const attribute = await this.productsRepository.manager
                .getRepository(ProductOptionAttribute)
                .save(item);

            productOption.attributes.push(attribute);
            await this.productsRepository.manager.query(
                `INSERT INTO product_option_attributes_product_option_attribute (productOptionId, productOptionAttributeId)VALUES (${productOption.id}, ${attribute.id});`,
            );
        }
        return productOption;
    }

    async updateProductOption(productOption) {
        const {title, price, available, id} = productOption;
        await this.productsRepository.manager
            .getRepository(ProductOption)
            .update(id, {title, price, available});
        for (const attribute of JSON.parse(productOption.attributes)) {
            const {value, attributeId} = attribute;
            await this.productsRepository.manager
                .getRepository(ProductOptionAttribute)
                .update(attribute.id, {value, attributeId});
        }
        return {
            code: 200,
            message: 'Success update product option',
        };
    }

    async deleteProductOption(productOption) {
        const {id} = productOption;
        await this.productsRepository.manager
            .getRepository(ProductOption)
            .delete(id);
        return {
            code: 200,
            message: 'Delete update product option',
        };
    }

    async updateProduct(product, file) {
        let data = parseData(product, file);

        if (product.removeImage) {
            data = {...data, ...{image: null}};
        }
        return await this.productsRepository.update(product.id, data);
    }

    async deleteProduct(product: Product) {
        return await this.productsRepository.delete(product);
    }
}

const parseData = (product, file) => {
    const {
        name,
        slug,
        description,
        shortDescription,
        metaTitle,
        metaDescription,
        metaKeywords,
        brand,
        category,
        type,
        productOptions,
    } = product;
    let data = {
        name,
        slug,
        description,
        shortDescription,
        metaTitle,
        metaDescription,
        metaKeywords,
        category,
        brand,
        type,
    };

    if (productOptions) {
        data = {...data, ...{productOptions: JSON.parse(productOptions)}};
    }

    if (file) {
        data = {...data, ...{image: file.filename}};
    }
    return data;
};
