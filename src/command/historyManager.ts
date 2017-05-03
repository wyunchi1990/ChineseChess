import { BaseCommand } from './baseCommand';
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
        this.history.push(command);
        this.index += 1;
    }

    public do(command: BaseCommand): BaseChessman {
        let kill_chessman: BaseChessman = command.do(this.board);
        // while (this.history.length >= this.index + 1) {
        //     this.history.pop();
        // }
        this.history = this.history.slice(0, this.index);
        this.history.push(command);
        this.index = this.history.length - 1;
        this.board.dump();

        return kill_chessman;
    }

    public redo(): void {
        console.log("redo ", this.index, this.history);
        this.index += 1;
        if (this.index >= this.history.length) {
            return;
        }

        let current_command: BaseCommand = this.current_command();
        if (current_command == null) {
            return;
        }
        console.log("redo ", current_command);
        current_command.redo(this.board);

        while (this.index < this.history.length - 1 && !this.isMoveCommand(this.index + 1)) {
            this.index += 1;
            // redo auto command
            let current_command: BaseCommand = this.current_command();

            current_command.redo(this.board);
        }
        this.board.dump();
    }

    private isMoveCommand(index: number): boolean {
        if (index < 0 || index >= this.history.length) {
            return false;
        }

        let command: BaseCommand = this.history[index];
        return command.command_type == commandTypeEnum.MOVE;
    }

    public undo(): void {
        console.log("undo", this.index, this.current_command());
        if (this.index < 0) {
            return;
        }

        let current_command: BaseCommand = this.current_command();
        if (current_command == null) {
            return;
        }
        current_command.undo(this.board);
        this.index -= 1;

        while (this.index >= 0 && !this.isMoveCommand(this.index)) {
            // undo auto command
            let current_command: BaseCommand = this.current_command();

            current_command.undo(this.board);
            this.index -= 1;
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
let kill_chessman: BaseChessman = historyManager.do(command);
historyManager.undo();
historyManager.redo();
chessman = b.get_chessman_at_position(new Point(1, 2));
command = CommandFactory.createCommand({"command_type": commandTypeEnum.MOVE, "chessman": chessman, "move_to_position": new Point(1, 9)});
kill_chessman = historyManager.do(command);
if (kill_chessman != null) {
    console.log("kill ", kill_chessman);
    command = CommandFactory.createCommand({"command_type": commandTypeEnum.KILL, "chessman": kill_chessman});
    historyManager.add_command(command);
    // historyManager.do(command);
}
console.log("move gun ", historyManager.index, historyManager.history);
historyManager.undo();
historyManager.redo();
console.log(historyManager.index, historyManager.history);
// let move_result = b.move(new Point(0, 0), new Point(0, 1));
// console.log(move_result, b.get_chessman_at_position(new Point(0, 1)));
// move_result = b.move(new Point(0, 1), new Point(4, 2));
// // console.log(b.chessman_set.values());
// console.log(move_result);
// // console.log(b._get_chessman_list_in_path([new Point(0, 0), new Point(1, 0), new Point(2, 0), new Point(3, 0), new Point(4, 0), new Point(5, 0), new Point(6, 0), new Point(7, 0), new Point(8, 0)]))
// b.dump();