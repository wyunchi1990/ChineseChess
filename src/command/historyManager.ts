import { BaseCommand } from './baseCommand';

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

    public redo() {
        while (this.index >= 0 || !this.isUserCommand(this.index)) {
            
        }
    }

    private isUserCommand(index: number): boolean {
        if (index < 0 || index >= this.history.length) {
            return false;
        }
        let command: BaseCommand = this.history[index];
        return command.isUserCommand();
    }

    public undo() {

    }
}