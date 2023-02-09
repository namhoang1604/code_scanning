import { ApiProperty } from '@nestjs/swagger';
import { ScanEvent } from '../entities/scan-event.entity';
import { CreateScanResponseDto } from './create-scan.dto';

/**
 * The vulnerability location
 */
class Location {
  /**
   * The vulnerability path
   */
  @ApiProperty()
  path: string;

  /**
   * The vulnerability position
   */
  @ApiProperty()
  positions: {
    begin: {
      line: string;
    };
  };
}
/**
 * The vulnerability response Dto
 */
class FindingResponseDto {
  /**
   * The vulnerability type
   */
  @ApiProperty()
  type: 'string';
  /**
   * The vulnerability location
   */
  @ApiProperty()
  location: Location;
}

/**
 * The result of scan response dto
 */
export class FindOneScanResponseDto extends CreateScanResponseDto {
  /**
   * The datetime when set the queued status
   */
  @ApiProperty()
  processedAt: Date;
  /**
   * The datetime when set the queued status
   */

  @ApiProperty()
  successAt: Date;
  /**
   * The datetime when set the queued status
   */

  @ApiProperty()
  failedAt: Date;
  /**
   * The vulnerabilities
   */
  @ApiProperty()
  findings: FindingResponseDto[];

  /**
   * The constructor for the dto
   *
   * @param scanEvent The scan event
   */
  constructor(scanEvent: ScanEvent) {
    super(scanEvent);
    this.processedAt = scanEvent.processedAt;
    this.successAt = scanEvent.successAt;
    this.failedAt = scanEvent.failedAt;
    this.findings = this.buildFindings(scanEvent.vulnerabilities);
  }

  /**
   * To build the vulnerabilities follow the template
   *
   * @param vulnerabilities The vulnerabilities
   * @returns The list of format vulnerabilities
   */
  private buildFindings(vulnerabilities): FindingResponseDto[] {
    return vulnerabilities.map((vulnerability) => {
      return {
        type: 'sast',
        location: {
          path: vulnerability.path,
          positions: {
            begin: {
              line: vulnerability.line,
            },
          },
        },
      };
    });
  }
}
