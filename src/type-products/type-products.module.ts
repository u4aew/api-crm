import {Module} from '@nestjs/common';
import {TypeProductsService} from './type-products.service';
import {TypeProductsController} from './type-products.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TypeProduct} from './type-product.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TypeProduct])],
    providers: [TypeProductsService],
    controllers: [TypeProductsController],
})
export class TypeProductsModule {
}
