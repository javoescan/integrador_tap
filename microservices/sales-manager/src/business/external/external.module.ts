import { Global, HttpModule, Module } from '@nestjs/common';
import { ExternalService } from './external.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [ExternalService],
  exports: [ExternalService]
})
export class ExternalModule {}