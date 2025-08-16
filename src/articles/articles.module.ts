import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Articulo, ArticuloSchema } from './schemas/article.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Articulo.name, schema: ArticuloSchema,collection: 'Articulos'},
    ]),
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}