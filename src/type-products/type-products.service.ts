import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {TypeProduct} from './type-product.entity';
import {Repository} from 'typeorm';

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
        return await this.typeProductsRepository.findOne(id);
    }

    async createTypeProduct(typeProduct: TypeProduct) {
        return await this.typeProductsRepository.save(typeProduct);
    }

    async updateTypeProduct(typeProduct: TypeProduct) {
        return this.typeProductsRepository.update(typeProduct.id, typeProduct);
    }

    async deleteTypeProduct(typeProduct: TypeProduct) {
        return await this.typeProductsRepository.delete(typeProduct);
    }
}
