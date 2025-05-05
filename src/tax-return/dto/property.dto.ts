import { ApiProperty } from '@nestjs/swagger';
import { PropertyType, Currency } from '../types/enums';

export class PropertyDto {
  @ApiProperty({ description: 'The unique identifier of the property record' })
  id: number;

  @ApiProperty({ 
    description: 'The type of property',
    enum: PropertyType,
    enumName: 'PropertyType'
  })
  type: PropertyType;

  @ApiProperty({ description: 'The name or description of the property value' })
  valueName: string;

  @ApiProperty({ description: 'The monetary value of the property' })
  value: number;

  @ApiProperty({ 
    description: 'The currency of the property value',
    enum: Currency,
    enumName: 'Currency'
  })
  currency: Currency;

  @ApiProperty({ 
    description: 'Additional properties in JSON format',
    required: false
  })
  properties?: Record<string, any>;

  @ApiProperty({ description: 'The date when the property record was created' })
  createdAt: Date;

  @ApiProperty({ description: 'The date when the property record was last updated' })
  updatedAt: Date;
} 