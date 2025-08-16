// src/nivel0/nivel0.controller.ts
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ScrapingNivelesService } from './scrapingNiveles.service';

@Controller('nivelesScraping')
export class ScrapingNivelesController {
  constructor(private readonly service: ScrapingNivelesService) {}

  @Get(':id/:level')
  findAll(@Param('id') id: string , @Param('level') level: string ) {
    console.log("nivel1_id"); 
        console.log(id);

    return this.service.findAll(id,parseInt(level,10) );
  }

}