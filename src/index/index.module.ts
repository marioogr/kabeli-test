import { Module } from '@nestjs/common';
import { IndexService } from './index.service';
import { IndexController } from './index.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [IndexController],
  providers: [IndexService],
  imports: [HttpModule.register({ timeout: 5000, maxRedirects: 5 })],
})
export class IndexModule {}
