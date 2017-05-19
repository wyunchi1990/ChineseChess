import { BaseCommand } from './baseInnerCommand';
import { commandTypeEnum } from '../enums/commandTypeEnum';
import { Board } from "../board"
import { data } from "../data/default";
import { Point } from '../common/point';
import { CommandFactory } from "./commandFactory"
import { BaseChessman } from "../chessman"

class HistoryManager {
    public history: BaseCommand[] = [];
    public index: number = -1;
    private board: Board;

    constructor(board: Board) {
        this.board = board;
    }

    public clear(): void {
        while (this.history.length != 0) {
            let command: BaseCommand = this.history.pop();
            command.clear();
        }
        this.board = null;
    }

    public add_command(command: BaseCommand): void {
        this.history = this.history.slice(0, this.index + 1);
        this.history.push(command);
        this.index = this.history.length - 1;
    }

    public do(command: BaseCommand): void {
        let kill_chessman: BaseChessman = command.do(this.board);
        if (kill_chessman != null) {
            let kill_command: BaseCommand = CommandFactory.createCommand({"command_type": commandTypeEnum.KILL, "chessman": kill_chessman});
            this.add_command(kill_command);
            kill_command.do(this.board)
        }
        this.add_command(command);
        command.do(this.board);
        this.board.dump();
    }

    private redo_single_command(): void {
        this.index += 1;
        let current_command: BaseCommand = this.current_command();
        current_command.redo(this.board);
    }

    public redo(): void {
        if (this.index >= this.history.length - 1) {
            return;
        }

        while (this.index <= this.history.length - 1) {
            this.redo_single_command();
            if (this.isMoveCommand(this.index)) {
                this.board.dump();
                return;
            }
        }
    }

    private isMoveCommand(index: number): boolean {
        if (index < 0 || index >= this.history.length) {
            return false;
        }

        let command: BaseCommand = this.history[index];
        return command.command_type == commandTypeEnum.MOVE;
    }

    private undo_single_command(): void {
        let current_command: BaseCommand = this.current_command();
        current_command.undo(this.board);
        this.index -= 1;
    }

    public undo(): void {
        if (this.index < 0) {
            return;
        }

        this.undo_single_command();
        while (this.index > 0 && !this.isMoveCommand(this.index)) {
            this.undo_single_command();
        }
        this.board.dump();
    }

    private current_command(): BaseCommand {
        if (this.index < 0 || this.index >= this.history.length) {
            return null;
        }

        return this.history[this.index];
    }
}

let b: Board = new Board(data);
let historyManager: HistoryManager = new HistoryManager(b);
let chessman: BaseChessman = b.get_chessman_at_position(new Point(0, 0));
let command: BaseCommand = CommandFactory.createCommand({"command_type": commandTypeEnum.MOVE, "chessman": chessman, "move_to_position": new Point(0, 1)});
historyManager.do(command);
// historyManager.add_command(command);
// historyManager.undo();
// historyManager.redo();

chessman = b.get_chessman_at_position(new Point(1, 2));
command = CommandFactory.createCommand({"command_type": commandTypeEnum.MOVE, "chessman": chessman, "move_to_position": new Point(1, 9)});
historyManager.do(command);
chessman = b.get_chessman_at_position(new Point(7, 2));
command = CommandFactory.createCommand({"command_type": commandTypeEnum.MOVE, "chessman": chessman, "move_to_position": new Point(7, 9)});
historyManager.do(command);
historyManager.undo();
historyManager.undo();
historyManager.redo();

historyManager.redo();
historyManager.redo();
historyManager.undo();
historyManager.undo();
historyManager.undo();
historyManager.undo();
console.log(historyManager.index, historyManager.history);
chessman = b.get_chessman_at_position(new Point(7, 2));
command = CommandFactory.createCommand({"command_type": commandTypeEnum.MOVE, "chessman": chessman, "move_to_position": new Point(7, 9)});
historyManager.do(command);
console.log(historyManager.index, historyManager.history);
