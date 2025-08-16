// src/nivel0/nivel0.controller.ts
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Nivel3Service } from './nivel3.service';

@Controller('nivel3')
export class Nivel3Controller {
  constructor(private readonly service: Nivel3Service) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

}