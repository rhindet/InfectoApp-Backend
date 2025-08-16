import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
    private readonly logger = new Logger(AppService.name);

  getHello(): string {
        console.log("entro")
        this.logger.log('entro');
       return 'Hello World!';
  }

public async getNivel0( getNivel0 ) {
      return 'Hola'

}


}
