import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {AttributesService} from './attributes.service';
import {Attribute} from './attribute.entity';

@Controller('attributes')
export class AttributesController {
    constructor(private service: AttributesService) {
    }

    @Get()
    getAll(@Param() params) {
        return this.service.getAttributes();
    }

    @Get(':id')
    get(@Param() params) {
        return this.service.getAttribute(params.id);
    }

    @Post()
    async create(@Body() attribute: Attribute) {
        return this.service.createAttribute(attribute);
    }

    @Put()
    update(@Body() attribute) {
        return this.service.updateAttribute(attribute);
    }

    @Delete(':id')
    deleteTypeProduct(@Param() params) {
        return this.service.deleteAttribute(params.id);
    }
}
