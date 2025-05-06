import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaxReturnService } from './tax-return.service';
import { Submission } from './types/submission.types';
import { SubmissionDto } from './dto/tax-return.dto';
import { CreateSubmissionDto } from './dto/create-submission.dto';

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

  @Post(':kennitala/submissions')
  @ApiOperation({ summary: 'Create a new submission for a person' })
  @ApiResponse({
    status: 201,
    description: 'Returns the created submission',
    type: SubmissionDto,
  })
  @ApiResponse({ status: 404, description: 'Person not found' })
  @ApiResponse({ status: 400, description: 'Invalid submission data' })
  createSubmission(
    @Param('kennitala') kennitala: string,
    @Body() data: CreateSubmissionDto,
  ): Promise<Submission> {
    return this.taxReturnService.createSubmission(kennitala, data);
  }

  @Put(':kennitala/latest/finish')
  @ApiOperation({ summary: 'Mark the latest submission as finished' })
  @ApiResponse({
    status: 200,
    description: 'Returns the updated submission',
    type: SubmissionDto,
  })
  @ApiResponse({ status: 404, description: 'Person or submission not found' })
  finishLatestSubmission(
    @Param('kennitala') kennitala: string,
  ): Promise<Submission> {
    return this.taxReturnService.finishLatestSubmission(kennitala);
  }
}
