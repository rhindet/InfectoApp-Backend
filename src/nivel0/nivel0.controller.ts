// src/nivel0/nivel0.controller.ts
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Nivel0Service } from './nivel0.service';

@Controller('nivel0')
export class Nivel0Controller {
  constructor(private readonly service: Nivel0Service) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get("/temas0")
  findAllTema() {
    return this.service.findAllTema();
  }

}