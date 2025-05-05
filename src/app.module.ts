import { Module } from '@nestjs/common';
import { TaxReturnController } from './tax-return/tax-return.controller';
import { TaxReturnService } from './tax-return/tax-return.service';

@Module({
  imports: [],
  controllers: [TaxReturnController],
  providers: [TaxReturnService],
})
export class AppModule {}
