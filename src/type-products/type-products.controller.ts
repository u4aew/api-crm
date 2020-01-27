import {Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors} from '@nestjs/common';
import {TypeProductsService} from './type-products.service';
import {TypeProduct} from './type-product.entity';

@Controller('type-products')
export class TypeProductsController {

    constructor(private service: TypeProductsService) {
    }

    @Get()
    getAll(@Param() params) {
        return this.service.getTypeProducts();
    }

    @Get(':id')
    get(@Param() params) {
        return this.service.getTypeProduct(params.id);
    }

    @Post()
    async create(@Body() typeProduct: TypeProduct) {
        return this.service.createTypeProduct(typeProduct);
    }

    @Put()
    update(@Body() typeProduct) {
        return this.service.updateTypeProduct(typeProduct);
    }

    @Delete(':id')
    deleteUser(@Param() params) {
        return this.service.deleteTypeProduct(params.id);
    }
}
