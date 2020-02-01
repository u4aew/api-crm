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
        return await this.typeProductsRepository.findOne(id, {relations: ['attributes']});
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
