import Dictionary from '../libs/typescript-collections/src/lib/Dictionary';
import { baseState } from './state/baseState';
import { gameState } from './enum/gameState';

class stateMachine {
    private _state_map: Dictionary<gameState, baseState>;
}