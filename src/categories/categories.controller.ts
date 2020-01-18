import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {CategoriesService} from './categories.service';
import {Category} from './category.entity';

@Controller('categories')
export class CategoriesController {

    constructor(private service: CategoriesService) { }

    @Get()
    getAll(@Param() params) {
        return this.service.getCategories();
    }

    @Get(':id')
    get(@Param() params) {
        return this.service.getCategory(params.id);
    }

    @Post()
    create(@Body() category: Category) {
        return this.service.createCategory(category);
    }

    @Put()
    update(@Body() category: Category) {
        return this.service.updateCategory(category);
    }

    @Delete(':id')
    deleteUser(@Param() params) {
        return this.service.deleteCategory(params.id);
    }
}
