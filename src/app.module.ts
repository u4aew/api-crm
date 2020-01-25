import {Module} from '@nestjs/common';
import {UsersModule} from './users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CategoriesModule} from './categories/categories.module';
import {MulterModule} from '@nestjs/platform-express';
import {AppController} from './app.controller';

@Module({
    imports: [
        MulterModule.register({
            dest: './files',
        }),
        TypeOrmModule.forRoot(),
        UsersModule,
        CategoriesModule,
    ],
    controllers: [AppController],
})
export class AppModule {
}
