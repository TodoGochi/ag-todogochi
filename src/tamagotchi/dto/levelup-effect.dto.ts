import { ApiProperty } from '@nestjs/swagger';

export class LevelEffectDto {
  @ApiProperty({ example: 1, description: '레벨 번호' })
  level: number;
  @ApiProperty({ example: true, description: '레벨 효과가 적용되었는지 여부' })
  effectApplied: boolean;
}
