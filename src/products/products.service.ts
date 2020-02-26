import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Product} from './product.entity';
import {ProductOption} from './product-option.entity';
import {ProductOptionAttribute} from './product-option-attribute.entity';
import {TypeProduct} from '../type-products/type-product.entity';
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
        return await this.productsRepository.findOne(id, {relations: ['category', 'type', 'brand']});
    }

    async createProductOption(productOption) {
        const product = new Product();
        product.id = productOption.productId;
        productOption.product = product;
        productOption.attributes = JSON.parse(productOption.attributes);
        const saveProductOption = await this.productsRepository.manager.getRepository(ProductOption).save(productOption);

        for (const item of productOption.attributes) {
            const productOptionModel = new ProductOption();
            productOptionModel.id = saveProductOption.id;
            item.productOption = productOptionModel;
            await this.productsRepository.manager.getRepository(ProductOptionAttribute).save(item);
        }

        return 'success';
    }

    async createProduct(product: Product, file) {
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

const parseData = (product, file) => {
    const {name, slug, description, shortDescription, metaTitle, metaDescription, metaKeywords, brand, category, typeId} = product;
    const typeProduct = new TypeProduct();
    typeProduct.id = typeId;
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
        type: typeProduct,
    };

    if (file) {
        data = {...data, ...{image: file.filename}};
    }
    return data;
};
