import { SwaggerOptions } from 'src/common/decorators/swagger.decorator';
import {
  PlayResponseDto,
  TamagotchiResDto,
  LevelProgressResDto,
  LevelUpResDto,
} from '../dto/tamagotchi-res.dto';

export const TAMAGOTCHI_DOCS: Record<string, SwaggerOptions> = {
  TAMAGOTCHI_CONTROLLER: {
    apiTags: 'Tamagotchi',
  },
  CREATE_NEW_TAMAGOTCHI: {
    operation: {
      summary: 'Create new tamagotchi',
      description: 'This endpoint creates a new tamagotchi with nickname',
    },
    bearerAuth: true,
    response: {
      status: 201,
      type: TamagotchiResDto,
    },
  },
  GET_TAMAGOTCHI: {
    operation: {
      summary: 'get tamagotchi status',
      description: 'This endpoint retrieves tamagotchi status',
    },
    bearerAuth: true,
    response: {
      status: 200,
      type: TamagotchiResDto,
    },
  },
  GET_LEVELPROGRESS: {
    operation: {
      summary: 'get tamagotchi level progress',
      description: 'This endpoint retrieves remaining time to get level up',
    },
    bearerAuth: true,
    response: {
      status: 200,
      type: LevelProgressResDto,
    },
  },
  FEED_TAMAGOTCHI: {
    operation: {
      summary: 'Feed',
      description:
        'This endpoint feed the tamagotchi and increase hunger level',
    },
    bearerAuth: true,
    response: {
      status: 200,
      type: TamagotchiResDto,
    },
  },
  PET_TAMAGOTCHI: {
    operation: {
      summary: 'PET',
      description:
        'This endpoint pet the tamagotchi and increase hapiness level',
    },
    bearerAuth: true,
    response: {
      status: 200,
      type: TamagotchiResDto,
    },
  },
  CURE_TAMAGOTCHI: {
    operation: {
      summary: 'cure sick tamagotchi',
      description:
        'This endpoint cure the tamagotchi and make hunger and happiness level full',
    },
    bearerAuth: true,
    response: {
      status: 200,
      type: TamagotchiResDto,
    },
  },
  RESURRECT_TAMAGOTCHI: {
    operation: {
      summary: 'Resurrect tamagotchi',
      description:
        'This endpoint resurrect  the dead tamagotchi and make hunger, happiness level full',
    },
    bearerAuth: true,
    response: {
      status: 200,
      type: TamagotchiResDto,
    },
  },
  RESTART_TAMAGOTCHI: {
    operation: {
      summary: 'Restart tamagotchi with new egg',
      description:
        'This endpoint restarts tamagotchi and initialize all the experience and level',
    },
    bearerAuth: true,
    response: {
      status: 200,
      type: TamagotchiResDto,
    },
  },
  PLAY_TAMAGOTCHI: {
    operation: {
      summary: 'Play with tamagotchi',
      description: 'This endpoint randomly retrieves 1 or 2 coins after play',
    },
    bearerAuth: true,
    response: {
      status: 200,
      type: PlayResponseDto,
    },
  },
  APPLY_LEVELUP: {
    operation: {
      summary: 'apply levelup Effect to tamagotchi',
      description: 'put boolean value to each level to check levelup Effect',
    },
    bearerAuth: true,
    response: {
      status: 201,
      type: LevelUpResDto,
    },
  },
};
