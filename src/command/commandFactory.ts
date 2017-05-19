import { BaseCommand, MoveCommand, KillCommand } from "./baseInnerCommand";
import { commandTypeEnum } from "../enums/commandTypeEnum"

export class CommandFactory {
    static createCommand(param): BaseCommand {
        let command: BaseCommand = null;

        let command_type: commandTypeEnum = param["command_type"];
        let chessman = param["chessman"];
        if (command_type == commandTypeEnum.MOVE) {
            let move_to_position = param["move_to_position"];
            command = new MoveCommand(chessman, move_to_position);
        } else if (command_type == commandTypeEnum.KILL) {
            command = new KillCommand(chessman)
        }

        return command;
    }
}
