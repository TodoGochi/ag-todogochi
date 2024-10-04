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
  TamagotchiReqDto,
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
  @Get(':id/status')
  async getTamagotchi(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const response = await this.tamagotchiService.getTamagotchi({
      userId: id,
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
  @Post(':id/feed')
  async feedTamagotchi(
    @Body() body: TamagotchiReqDto,
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const response = await this.tamagotchiService.feedTamagotchi({
      ...body,
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
    @Body() body: TamagotchiReqDto,
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const response = await this.tamagotchiService.petTamagotchi({
      ...body,
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
    @Body() body: TamagotchiReqDto,
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const response = await this.tamagotchiService.cureTamagotchi({
      ...body,
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
    @Body() body: TamagotchiReqDto,
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const response = await this.tamagotchiService.resurrectTamagotchi({
      ...body,
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
    @Body() body: TamagotchiReqDto,
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const response = await this.tamagotchiService.restartTamagotchi({
      ...body,
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
    @Body() body: TamagotchiReqDto,
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const response = await this.tamagotchiService.playTamagotchi({
      ...body,
      TamagotchiId: id,
      req,
    });
    return res.status(response.status).json(response.data);
  }
}
