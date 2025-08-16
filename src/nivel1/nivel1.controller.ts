// src/nivel0/nivel0.controller.ts
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Nivel1Service } from './nivel1.service';

@Controller('nivel1')
export class Nivel1Controller {
  constructor(private readonly service: Nivel1Service) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

}