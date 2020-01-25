import {Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor, FilesInterceptor} from '@nestjs/platform-express';
import {CategoriesService} from './categories.service';
import {Category} from './category.entity';
import { diskStorage } from 'multer';
import {editFileName, imageFileFilter} from '../utils/file-uploading.utils';

@Controller('categories')
export class CategoriesController {

    constructor(private service: CategoriesService) {
    }

    @Get()
    getAll(@Param() params) {
        return this.service.getCategories();
    }

    @Get(':id')
    get(@Param() params) {
        return this.service.getCategory(params.id);
    }

    @Post()
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './files',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }))
    async create(@UploadedFile() file, @Body() category: Category) {
        return this.service.createCategory(category, file);
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
        return this.service.updateCategory(category, file);
    }

    @Delete(':id')
    deleteUser(@Param() params) {
        return this.service.deleteCategory(params.id);
    }
}
