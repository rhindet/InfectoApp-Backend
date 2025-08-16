// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesModule } from './articles/articles.module';
import { MongooseConnectionLogger } from './articles/mongoose-connection-logger';
import { Nivel0Module } from './nivel0/nivel0.module';
import { Nivel1Module } from './nivel1/nivel1.module'; 
import { Nivel2Module } from './nivel2/nivel2.module'; 
import { Nivel3Module } from './nivel3/nivel3.module'; 
import { ScrapingNivelesModule } from './scrapingNiveles/scrapingNiveles.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => {
        const uri = cfg.get<string>('MONGO_URI');
        //console.log("uri",uri)
        if (!uri) throw new Error('MONGO_URI no definida en .env');
        return { uri };
      },
    }),
    ArticlesModule,
    Nivel0Module, 
    Nivel1Module, 
    Nivel2Module, 
    Nivel3Module, 
    ScrapingNivelesModule 
  ],
  providers: [MongooseConnectionLogger],
})
export class AppModule {}