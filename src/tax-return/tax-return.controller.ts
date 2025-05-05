import { Body, Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaxReturnService } from './tax-return.service';
import { Submission } from './types/submission.types';
import { SubmissionDto } from './dto/submission.dto';

@ApiTags('Tax Return')
@Controller('/api/tax-return')
export class TaxReturnController {
  constructor(private readonly taxReturnService: TaxReturnService) {}

  @Get(':kennitala/latest')
  @ApiOperation({ summary: 'Get latest submission for a person' })
  @ApiResponse({
    status: 200,
    description: 'Returns the latest submission for a person',
    type: SubmissionDto,
  })
  @ApiResponse({ status: 404, description: 'Person not found' })
  getLatestSubmission(
    @Param('kennitala') kennitala: string,
  ): Promise<Submission | null> {
    return this.taxReturnService.getLatestSubmission(kennitala);
  }
}