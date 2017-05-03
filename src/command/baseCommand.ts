import { commandTypeEnum } from '../enums/commandTypeEnum';
import { Board } from "../board";
import { BaseChessman } from "../chessman"
import { Point } from "../common/point"

class BaseCommand {
    private _command_type: commandTypeEnum;
    private _chessman: BaseChessman;

    get command_type(): commandTypeEnum {
        return this._command_type;
    }

    constructor(command_type: commandTypeEnum, chessman: BaseChessman) {
        this._command_type = command_type;
        this._chessman = chessman;
    }

    public clear(): void {
        this._chessman = null;
    }

    public do: (board: Board) => BaseChessman;
    public undo: (board: Board) => void;
    public redo: (board: Board) => void;
}

class MoveCommand extends BaseCommand {
    private _next_position: Point;
    private _pre_position: Point;

    constructor(chessman: BaseChessman, next_position: Point) {
        super(commandTypeEnum.MOVE, chessman);
        this._next_position = next_position;
        this._pre_position = chessman.position;
    }

    do = function(board: Board): BaseChessman {
        let [can_move, kill_chessman]: [boolean, BaseChessman] = board.try_to_move(this._chessman.position, this._next_position);

        if (can_move) {
            board.move(this._chessman.position, this._next_position);
        }
        return kill_chessman;
    }

    redo = function(board: Board): void {
        board.move(this._chessman.position, this._next_position);
    }

    undo = function(board: Board): void {
        board.move(this._next_position, this._pre_position);
    }
}

class KillCommand extends BaseCommand {
    constructor(chessman: BaseChessman) {
        super(commandTypeEnum.KILL, chessman);
    }

    do = function(board: Board): BaseChessman {
        this._chessman.death();

        return null;
    }

    redo = function(board: Board): void {
        this._chessman.death();
    }

    undo = function(board: Board): void {
        this._chessman.revive();
    }
}

export { BaseCommand, MoveCommand, KillCommand }
