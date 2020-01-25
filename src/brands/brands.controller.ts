import {Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors} from '@nestjs/common';
import {BrandsService} from './brands.service';
import {FileInterceptor} from '@nestjs/platform-express';
import {editFileName, imageFileFilter} from '../utils/file-uploading.utils';
import { diskStorage } from 'multer';
import {Brand} from './brand.entity';

@Controller('brands')
export class BrandsController {
    constructor(private service: BrandsService) {
    }

    @Get()
    getAll(@Param() params) {
        return this.service.getBrands();
    }

    @Get(':id')
    get(@Param() params) {
        return this.service.getBrand(params.id);
    }

    @Post()
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './files',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }))
    async create(@UploadedFile() file, @Body() brand: Brand) {
        return this.service.createBrand(brand, file);
    }
    @Put()
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './files',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }))
    update(@UploadedFile() file, @Body() brand) {
        return this.service.updateBrand(brand, file);
    }

    @Delete(':id')
    deleteUser(@Param() params) {
        return this.service.deleteBrand(params.id);
    }
}
