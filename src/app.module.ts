import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CategoriesModule} from './categories/categories.module';
import {MulterModule} from '@nestjs/platform-express';
import {AppController} from './app.controller';
import { BrandsModule } from './brands/brands.module';
import { AttributesModule } from './attributes/attributes.module';

@Module({
    imports: [
        MulterModule.register({
            dest: './files',
        }),
        TypeOrmModule.forRoot(),
        CategoriesModule,
        BrandsModule,
        AttributesModule,
    ],
    controllers: [AppController],
})
export class AppModule {
}
