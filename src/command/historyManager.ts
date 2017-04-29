import { BaseCommand } from './baseCommand';
import { commandTypeEnum } from '../enums/commandTypeEnum';

class historyManager {
    private history: BaseCommand[] = [];
    private index: number = -1;

    public do(command: BaseCommand): void {
        command.do();
        while (this.history.length > this.index) {
            this.history.pop();
        }
        this.history.push(command);
        this.index = this.history.length - 1;
    }

    public redo(): void {
        if (this.index >= this.history.length) {
            return;
        }

        let current_command: BaseCommand = this.current_command();
        if (current_command == null) {
            return;
        }
        current_command.undo();
        this.index += 1;

        while (this.index < this.history.length && !this.isUserCommand(this.index)) {
            // redo auto command
            let current_command: BaseCommand = this.current_command();

            current_command.undo();
            this.index += 1;
        }
    }

    private isUserCommand(index: number): boolean {
        if (index < 0 || index >= this.history.length) {
            return false;
        }

        let command: BaseCommand = this.history[index];
        return command.command_type == commandTypeEnum.USER;
    }

    public undo(): void {
        if (this.index <= 0) {
            return;
        }

        let current_command: BaseCommand = this.current_command();
        if (current_command == null) {
            return;
        }
        current_command.undo();
        this.index -= 1;

        while (this.index >= 0 && !this.isUserCommand(this.index)) {
            // undo auto command
            let current_command: BaseCommand = this.current_command();

            current_command.undo();
            this.index -= 1;
        }
    }

    private current_command(): BaseCommand {
        if (this.index < 0 || this.index >= this.history.length) {
            return null;
        }

        return this.history[this.index];
    }
}