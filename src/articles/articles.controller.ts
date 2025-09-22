import { Controller, Get, Query, Param, NotFoundException, BadRequestException, Delete } from '@nestjs/common';
import { Types } from 'mongoose';
import { ArticlesService } from './articles.service';
import { Articulo } from './schemas/article.schema'; // o tu DTO si lo tienes

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

 

  @Get('/search')
  async search(
    @Query('q') q: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    console.log("search")
    return this.articlesService.searchInContenidosRegex(q, Number(page), Number(limit));
  }

   @Get()
  async findAll(): Promise<Articulo[]> {
        console.log ("entro2")

    return this.articlesService.findAll(); // idealmente con .lean() en el service
  }

  @Get(':id')
  async findOne(@Param('id') id: string){
    console.log ("entro id ")
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

    @Delete('/delete/:id')
  async deleteOne(@Param('id') id: string){
   
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('El id no es un ObjectId válido');
    }

    const article = await this.articlesService.deleteOne(id);
    
    if (!article) {
      throw new NotFoundException(`Artículo ${id} no encontrado`);
    }
    return article;
  }



   @Get('/article/:id')
  async findById(@Param('id') id: string){
    console.log ("entro article id ")
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