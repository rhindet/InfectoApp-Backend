import { Controller, Get, Param, NotFoundException, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';
import { ArticlesService } from './articles.service';
import { Articulo } from './schemas/article.schema'; // o tu DTO si lo tienes

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async findAll(): Promise<Articulo[]> {
        console.log ("entro2")

    return this.articlesService.findAll(); // idealmente con .lean() en el service
  }

  @Get(':id')
  async findOne(@Param('id') id: string){
    console.log ("entro")
    // valida ObjectId si usas Mongo 
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('El id no es un ObjectId válido');
    }

    const article = await this.articlesService.findOne(id);
    
    if (!article) {
      throw new NotFoundException(`Artículo ${id} no encontrado`);
    }
    return article;
  }




  

   @Get('/article/:id')
  async findById(@Param('id') id: string){
    console.log ("entro")
    // valida ObjectId si usas Mongo 
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('El id no es un ObjectId válido');
    }

    const article = await this.articlesService.findById(id);
    
    if (!article) {
      throw new NotFoundException(`Artículo ${id} no encontrado`);
    }
    return article;
  }


}