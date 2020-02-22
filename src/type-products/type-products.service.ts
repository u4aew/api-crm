import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {TypeProduct} from './type-product.entity';
import {Repository} from 'typeorm';
import {Attribute} from '../attributes/attribute.entity';

@Injectable()
export class TypeProductsService {
    constructor(@InjectRepository(TypeProduct) private typeProductsRepository: Repository<TypeProduct>) {
    }

    async getTypeProducts(): Promise<TypeProduct[]> {
        return await this.typeProductsRepository.find({
            select: ['id', 'name'],
        });
    }

    async getTypeProduct(id: number) {
        const result = [];
        const typeProduct = await this.typeProductsRepository.findOne(id, {relations: ['attributes']});
        for (const item of typeProduct.attributes) {
            const test = await this.typeProductsRepository.manager.getRepository(Attribute).findOne(item.id, {relations: ['type']});
            result.push({...item, ...{typeId: test.type.id}});
        }
        typeProduct.attributes = result;
        return typeProduct;
    }

    async createTypeProduct(typeProduct: TypeProduct) {
        const attr = [];
        try {
            typeProduct.attributes.forEach((id) => {
                const attribute = new Attribute();
                attribute.id = Number(id);
                attr.push(attribute);
            });
        } catch (e) {
            // do nothing
        }
        typeProduct.attributes = attr;
        return await this.typeProductsRepository.save(typeProduct);
    }

    async updateTypeProduct(typeProduct: TypeProduct) {
        const attr = [];
        try {
            typeProduct.attributes.forEach((id) => {
                const attribute = new Attribute();
                attribute.id = Number(id);
                attr.push(attribute);
            });
        } catch (e) {
            // do nothing
        }
        typeProduct.attributes = attr;
        return this.typeProductsRepository.save(typeProduct);
    }

    async deleteTypeProduct(typeProduct: TypeProduct) {
        return await this.typeProductsRepository.delete(typeProduct);
    }
}
