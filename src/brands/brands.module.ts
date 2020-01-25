import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {BrandsService} from './brands.service';
import {BrandsController} from './brands.controller';
import {Brand} from './brand.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Brand])],
    providers: [BrandsService],
    controllers: [BrandsController],
})

export class BrandsModule {}
