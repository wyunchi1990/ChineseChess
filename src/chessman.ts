import { Camp } from './enums/camp';
import { Point } from './common/point';
import { ChessmanState } from './enums/chessmanState';
import { translate_position_to_local, is_in_curt, is_in_motherland } from "./utils/positionHelper";

class BaseChessman {
    protected _id: number;
    get id(): number {
        return this._id;
    }
    set id(id: number) {
        this._id = id;
    }

    protected _camp: Camp;
    get camp(): Camp {
        return this._camp;
    }
    set camp(camp: Camp) {
        this._camp = camp;
    }

    protected _position: Point;
    get position(): Point {
        return this._position;
    }
    set position(position: Point) {
        this._position =position;
    }

    protected status: ChessmanState;
    public death() {
        this.status = ChessmanState.DEATH;
    }
    public revive() {
        this.status = ChessmanState.ALIVE;
    }
    public is_alive(): boolean {
        return this.status == ChessmanState.ALIVE;
    }

    check_next_point: (Point) => boolean;

    get_path: (Point) => boolean;

    constructor(camp: Camp, x: number, y: number, id: number) {
        this._camp = camp;
        this._position = new Point(x, y);
        this._id = id;
        this.status = ChessmanState.ALIVE;
    }
}

class Soldier extends BaseChessman {

}

class Gun extends BaseChessman {

}

class Car extends BaseChessman {
    check_next_point = function(next_point: Point): boolean {
        return next_point.x == this.position.x || next_point.y == this.position.y;
    }
}

class Horse extends BaseChessman {

}

class Minister extends BaseChessman {
    check_next_point = function(next_point: Point): boolean {
        next_point = translate_position_to_local(next_point, this._camp);
        if (!is_in_motherland(next_point)) {
            return false;
        }

        let delta_x = next_point.x - this._position.x;
        let delta_y = next_point.y - this._position.y;
        if (Math.abs(delta_x) == 2 && Math.abs(delta_y) == 2) {
            return true;
        }

        return false;
    }
}

class StrategicAdviser extends BaseChessman {
    check_next_point = function(next_point: Point): boolean {
        next_point = translate_position_to_local(next_point, this._camp);
        if (!is_in_curt(next_point)) {
            return false;
        }

        let delta_x = next_point.x - this._position.x;
        let delta_y = next_point.y - this._position.y;
        if (Math.abs(delta_x) == 1 && Math.abs(delta_y) == 1) {
            return true;
        }

        return false;
    }
}

class King extends BaseChessman {
    check_next_point = function(next_point: Point): boolean {
        next_point = translate_position_to_local(next_point, this._camp);
        if (!is_in_curt(next_point)) {
            return false;
        }
        
        let delta_x = next_point.x - this._position.x;
        let delta_y = next_point.y - this._position.y;
        if (Math.abs(delta_x) + Math.abs(delta_y) == 1 &&
            delta_x * delta_y == 0) {
            return true;
        }

        return false;
    }
}

export {BaseChessman, Soldier, Gun, Car, Horse, Minister, StrategicAdviser, King};
