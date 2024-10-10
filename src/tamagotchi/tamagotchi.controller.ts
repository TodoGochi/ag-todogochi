import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
  Get,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/common/core/guards/access-token.guard';
import { RolesGuard } from 'src/common/core/guards/role.guard';
import { TamagotchiOwnershipGuard } from 'src/common/core/guards/tamagotchi-id.guard';
import { Role } from 'src/common/decorators/roles.decorator';
import { ROLE } from 'src/common/constants/role.constant';
import { Request, Response } from 'express';
import { Swagger } from 'src/common/decorators/swagger.decorator';
import { TAMAGOTCHI_DOCS } from './constant/tamagotchi.swagger';
import { TamagotchiService } from './tamagotchi.service';
import {
  CreateTamagotchiReqDto,
  TamagotchiParamDto,
} from './dto/tamagotchi-req.dto';
import { ApiTags } from '@nestjs/swagger';
import { CoinCheckInterceptor } from './interceptors/coin-check.interceptor';

@ApiTags('Tamagotchi')
@Controller('tamagotchi')
export class TamagotchiController {
  constructor(private readonly tamagotchiService: TamagotchiService) {}

  @Swagger(TAMAGOTCHI_DOCS.CREATE_NEW_TAMAGOTCHI)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Role(ROLE.MEMBER)
  @Post('create')
  async createNewTamagotchi(
    @Body() body: CreateTamagotchiReqDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const response = await this.tamagotchiService.createNewTamagotchi({
      ...body,
      req,
    });
    return res.status(response.status).json(response.data);
  }

  @Swagger(TAMAGOTCHI_DOCS.GET_TAMAGOTCHI)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Role(ROLE.MEMBER)
  @Get(':userId/status')
  async getTamagotchi(
    @Param('userId') userId: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const response = await this.tamagotchiService.getTamagotchi({
      userId: userId,
      req,
    });
    return res.status(response.status).json(response.data);
  }

  @Swagger(TAMAGOTCHI_DOCS.GET_LEVELPROGRESS)
  @UseGuards(AccessTokenGuard, RolesGuard, TamagotchiOwnershipGuard)
  @Role(ROLE.MEMBER)
  @Get(':id/level-progress')
  async getLevelProgress(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const response = await this.tamagotchiService.getLevelProgress({
      TamagotchiId: id,
      req,
    });
    return res.status(response.status).json(response.data);
  }

  @Swagger(TAMAGOTCHI_DOCS.FEED_TAMAGOTCHI)
  @UseGuards(AccessTokenGuard, RolesGuard, TamagotchiOwnershipGuard)
  @Role(ROLE.MEMBER)
  @UseInterceptors(CoinCheckInterceptor)
  @Post(':id/feed')
  async feedTamagotchi(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const response = await this.tamagotchiService.feedTamagotchi({
      TamagotchiId: id,
      req,
    });
    return res.status(response.status).json(response.data);
  }

  @Swagger(TAMAGOTCHI_DOCS.PET_TAMAGOTCHI)
  @UseGuards(AccessTokenGuard, RolesGuard, TamagotchiOwnershipGuard)
  @Role(ROLE.MEMBER)
  @Post(':id/pet')
  async petTamagotchi(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const response = await this.tamagotchiService.petTamagotchi({
      TamagotchiId: id,
      req,
    });
    return res.status(response.status).json(response.data);
  }

  @Swagger(TAMAGOTCHI_DOCS.CURE_TAMAGOTCHI)
  @UseGuards(AccessTokenGuard, RolesGuard, TamagotchiOwnershipGuard)
  @Role(ROLE.MEMBER)
  @UseInterceptors(CoinCheckInterceptor)
  @Post(':id/cure')
  async cureTamagotchi(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const response = await this.tamagotchiService.cureTamagotchi({
      TamagotchiId: id,
      req,
    });
    return res.status(response.status).json(response.data);
  }

  @Swagger(TAMAGOTCHI_DOCS.RESURRECT_TAMAGOTCHI)
  @UseGuards(AccessTokenGuard, RolesGuard, TamagotchiOwnershipGuard)
  @Role(ROLE.MEMBER)
  @UseInterceptors(CoinCheckInterceptor)
  @Post(':id/resurrect')
  async resurrectTamagotchi(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const response = await this.tamagotchiService.resurrectTamagotchi({
      TamagotchiId: id,
      req,
    });
    return res.status(response.status).json(response.data);
  }

  @Swagger(TAMAGOTCHI_DOCS.RESTART_TAMAGOTCHI)
  @UseGuards(AccessTokenGuard, RolesGuard, TamagotchiOwnershipGuard)
  @Role(ROLE.MEMBER)
  @Post(':id/restart')
  async restartTamagotchi(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const response = await this.tamagotchiService.restartTamagotchi({
      TamagotchiId: id,
      req,
    });
    return res.status(response.status).json(response.data);
  }

  @Swagger(TAMAGOTCHI_DOCS.PLAY_TAMAGOTCHI)
  @UseGuards(AccessTokenGuard, RolesGuard, TamagotchiOwnershipGuard)
  @Role(ROLE.MEMBER)
  @Post(':id/play')
  async playTamagotchi(
    @Param() params: TamagotchiParamDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const response = await this.tamagotchiService.playTamagotchi({
      TamagotchiId: params.id,
      req,
    });
    return res.status(response.status).json(response.data);
  }
}
