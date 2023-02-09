import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ScansService } from './scans.service';
import {
  CreateScanRequestDto,
  CreateScanResponseDto,
} from './dto/create-scan.dto';
import { FindOneScanResponseDto } from './dto/find-one-scan.dto';
import { ApiExtraModels } from '@nestjs/swagger';
import { BaseApiResponse } from '../../common/decorators/base-api-response.decorator';
import { View } from '../../common/decorators/view.decorator';

/**
 * Scan controller
 */
@Controller('/api/scan')
export class ScansController {
  /**
   * The constructor for the scan controller
   *
   * @param scansService The scan service
   */
  constructor(private readonly scansService: ScansService) {}

  /**
   * To trigger scan the repository
   *
   * @param createScanDto The creation scan dto
   * @returns The scan json data
   */
  @Post()
  @View(CreateScanResponseDto)
  @ApiExtraModels(CreateScanResponseDto)
  @BaseApiResponse(CreateScanResponseDto)
  async create(@Body() createScanDto: CreateScanRequestDto) {
    const result = await this.scansService.create(createScanDto);
    return { result, message: 'Scan is processing' };
  }

  /**
   * To fetch the detail scan
   *
   * @param id The unique id of the scan event
   * @returns The detail scan event json data
   */
  @Get(':id')
  @View(FindOneScanResponseDto)
  @ApiExtraModels(FindOneScanResponseDto)
  @BaseApiResponse(FindOneScanResponseDto)
  async findOne(@Param('id') id: string) {
    const result = await this.scansService.findOne(id);
    return { result, message: 'The detail of scan' };
  }
}
