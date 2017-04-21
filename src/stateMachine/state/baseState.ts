import { gameState } from '../enum/gameState';
import { gameStepEnum } from '../enum/gameStepEnum';

export class baseState {
    public enter: (game_state: gameState, game_step_type: gameStepEnum) => boolean;
    public leave: (game_state: gameState, game_step_type: gameStepEnum) => boolean;
}
