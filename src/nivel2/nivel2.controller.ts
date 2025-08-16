// src/nivel0/nivel0.controller.ts
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Nivel2Service } from './nivel2.service';

@Controller('nivel2')
export class Nivel2Controller {
  constructor(private readonly service: Nivel2Service) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('id')
  findAllFiltered(@Param('id') id: string) {
    return this.service.findAllFiltered(id);
  }

}