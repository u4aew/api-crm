import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CategoriesModule} from './categories/categories.module';
import {MulterModule} from '@nestjs/platform-express';
import {AppController} from './app.controller';
import { BrandsModule } from './brands/brands.module';
import { AttributesModule } from './attributes/attributes.module';
import { TypeProductsModule } from './type-products/type-products.module';

@Module({
    imports: [
        MulterModule.register({
            dest: './files',
        }),
        TypeOrmModule.forRoot(),
        CategoriesModule,
        BrandsModule,
        AttributesModule,
        TypeProductsModule,
    ],
    controllers: [AppController],
})
export class AppModule {
}
