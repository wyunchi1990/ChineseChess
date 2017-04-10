import { Point } from './common/point';
import { Camp } from './enums/camp';
import { baseChessman } from "./chessman";

class board {
    default_config: baseChessman[] = [];

    baseChessmanDict = {};
    _id_count: number = 0;

    hasAllyAtPosition(camp: Camp, position: Point): boolean {
        return true;
    }

    _generate_id(): number {
        return this._id_count++;
    }

    init() {

    }
}
