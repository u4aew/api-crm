import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Attribute} from './attribute.entity';
import {Repository} from 'typeorm';

@Injectable()
export class AttributesService {
    constructor(@InjectRepository(Attribute) private attributesRepository: Repository<Attribute>) {
    }
    async getAttributes(): Promise<Attribute[]> {
        return await this.attributesRepository.find({
            select: ['id', 'name'],
        });
    }

    async getAttribute(id: number) {
        return await this.attributesRepository.findOne(id);
    }

    async createAttribute(attribute: Attribute) {
        return await this.attributesRepository.save(attribute);
    }

    async updateAttribute(attribute: Attribute) {
        return this.attributesRepository.update(attribute.id, attribute);
    }

    async deleteAttribute(attribute: Attribute) {
        return await this.attributesRepository.delete(attribute);
    }
}
