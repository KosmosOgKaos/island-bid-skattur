import { Body, Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaxReturnService } from './tax-return.service';

@ApiTags('Tax Return')
@Controller('/api/tax-return')
export class TaxReturnController {
  constructor(private readonly taxReturnService: TaxReturnService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tax returns' })
  @ApiResponse({ status: 200, description: 'Returns all tax returns' })
  getTaxReturn(): string {
    return this.taxReturnService.getTaxReturn();
  }
}