import { Injectable } from '@nestjs/common';

@Injectable()
export class TaxReturnService {
  getTaxReturn(): string {
    return 'Tax return data';
  }

  createTaxReturn(data: any): string {
    return `Created tax return with data: ${JSON.stringify(data)}`;
  }

  updateTaxReturn(id: string, data: any): string {
    return `Updated tax return ${id} with data: ${JSON.stringify(data)}`;
  }

  deleteTaxReturn(id: string): string {
    return `Deleted tax return ${id}`;
  }
}