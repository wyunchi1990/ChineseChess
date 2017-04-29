import { commandTypeEnum } from '../enums/commandTypeEnum';

export class BaseCommand {
    private _command_type: commandTypeEnum;

    get command_type(): commandTypeEnum {
        return this._command_type;
    }

    constructor(command_type: commandTypeEnum) {
        this._command_type = command_type;
    }

    public do: () => void;
    public undo: () => void;
    public redo: () => void;
}
