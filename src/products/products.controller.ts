import {Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import {ProductsService} from './products.service';
import {Product} from './product.entity';
import {diskStorage} from 'multer';
import {editFileName, imageFileFilter} from '../utils/file-uploading.utils';
import {ProductOption} from './product-option.entity';

@Controller('products')
export class ProductsController {

    constructor(private service: ProductsService) {
    }

    @Get()
    getAll(@Param() params) {
        return this.service.getProducts();
    }

    @Get(':id')
    get(@Param() params) {
        return this.service.getProduct(params.id);
    }

    @Put('/options/')
    updateProductOption(@Body() productOption: ProductOption) {
        return this.service.updateProductOption(productOption);
    }

    @Post('/options/')
    createProductOption(@Body() productOption: ProductOption) {
        return this.service.createProductOption(productOption);
    }

    @Post('/options/')
    deleteProductOption(@Body() productOption: ProductOption) {
        return this.service.deleteProductOption(productOption);
    }

    @Post()
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './files',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }))
    async create(@UploadedFile() file, @Body() product: Product) {
        return this.service.createProduct(product, file);
    }

    @Put()
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './files',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }))
    update(@UploadedFile() file, @Body() category) {
        return this.service.updateProduct(category, file);
    }

    @Delete(':id')
    deleteUser(@Param() params) {
        return this.service.deleteProduct(params.id);
    }
}
