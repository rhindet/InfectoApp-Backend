import { Controller, Get, Param } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Articulo } from './schemas/article.schema';
import { Nivel0, Nivel0Schema } from '../nivel0/nivel0.schema';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async findAll(): Promise<Articulo[]> {
    console.log("Entro")
    return this.articlesService.findAll(); 
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Articulo> {
        console.log("Entro")
    return this.articlesService.findOne(id);
  }

  
}