// src/nivel0/nivel0.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Nivel1Service } from 'src/nivel1/nivel1.service';
import { Nivel1Controller } from 'src/nivel1/nivel1.controller';
import { Nivel1 ,Nivel1Schema} from 'src/nivel1/nivel1.schema';
import { Nivel2,Nivel2Schema } from 'src/nivel2/nivel2.schema';
import { Nivel2Service } from 'src/nivel2/nivel2.service';
import { Nivel2Controller } from 'src/nivel2/nivel2.controller';
import { ScrapingNivelesController } from './scrapingNiveles.controller';
import { ScrapingNivelesService } from './scrapingNiveles.service';
import { Articulo,ArticuloSchema} from 'src/articles/schemas/article.schema';
import { ArticlesController } from 'src/articles/articles.controller';
import { ArticlesService } from 'src/articles/articles.service';
import { Nivel3Schema } from 'src/nivel3/nivel3.schema';
import { Nivel3 } from 'src/nivel3/nivel3.schema';
import { Nivel3Controller } from 'src/nivel3/nivel3.controller';
import { Nivel3Service } from 'src/nivel3/nivel3.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Nivel1.name, schema: Nivel1Schema, collection: 'nivel1' },
      { name: Nivel2.name, schema: Nivel2Schema, collection: 'nivel2' },
      { name: Nivel3.name, schema: Nivel3Schema, collection: 'nivel3' },
    ]),  
  ],
  controllers: [Nivel1Controller,Nivel2Controller,ScrapingNivelesController,Nivel3Controller],
  providers: [Nivel1Service,Nivel2Service,ScrapingNivelesService,Nivel3Service],
  exports: [MongooseModule], 
})  
export class ScrapingNivelesModule {}