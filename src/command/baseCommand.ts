import { commandTypeEnum } from '../enums/commandTypeEnum';

export class BaseCommand {
    private command_type: commandTypeEnum;

    constructor(command_type: commandTypeEnum) {
        this.command_type = command_type;
    }

    public isUserCommand(): boolean {
        return this.command_type == commandTypeEnum.USER;
    }

    public do: () => void;
    public undo: () => void;
    public redo: () => void;
}
