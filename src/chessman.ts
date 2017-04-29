import { Camp } from './enums/camp';
import { Point } from './common/point';
import { ChessmanState } from './enums/chessmanState';
import { translate_position_to_local, is_in_curt, is_in_motherland, get_point_in_segment } from "./utils/positionHelper";

class BaseChessman {
    public name: String;

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

    public check_next_point: (Point) => boolean; // 这里只判断从行走逻辑角度该点是否可达，至于马、象的别子，炮的跳子，在其他函数中判断

    public get_barricade_number: (Point) => [Point[], number]; // 计算行走路线，以及路线中路障的个数，炮为1，其他为0

    constructor(camp: Camp, x: number, y: number, id: number) {
        this.camp = camp;
        this.position = new Point(x, y);
        this.id = id;
        this.status = ChessmanState.ALIVE;
    }
}

class Soldier extends BaseChessman {
    get name(): String {
        if (this.camp == Camp.RED) {
            return "兵";
        } else {
            return "卒";
        }
    }

    check_next_point = function(next_point: Point): boolean {
        next_point = translate_position_to_local(next_point, this._camp);
        let current_point: Point = translate_position_to_local(this.position, this.camp);

        if (is_in_motherland(next_point)) {
            return current_point.x == next_point.x && current_point.y == next_point.y + 1;
        }
        
        let delta_x = next_point.x - current_point.x;
        let delta_y = next_point.y - current_point.y;
        if ((delta_x == 0 && delta_y == 1) || (delta_x == -1 && delta_y == 0) ||
            (delta_x == 1 && delta_y == 0)) {
            return true;
        }
        return false;
    }

    get_barricade_number = function(next_point: Point): [Point[], number] {
        return [[], 0];
    }
}

class Gun extends BaseChessman {
    get name(): String {
        return "炮";
    }

    check_next_point = function(next_point: Point): boolean {
        return next_point.x == this.position.x || next_point.y == this.position.y;
    }

    get_barricade_number = function(next_point: Point): [Point[], number] {
        return [get_point_in_segment(this.position, next_point), 1];
    }
}

class Car extends BaseChessman {
    get name(): String {
        return "车";
    }

    check_next_point = function(next_point: Point): boolean {
        return next_point.x == this.position.x || next_point.y == this.position.y;
    }

    get_barricade_number = function(next_point: Point): [Point[], number] {
        return [get_point_in_segment(this.position, next_point), 0];
    }
}

class Horse extends BaseChessman {
    get name(): String {
        return "马";
    }

    check_next_point = function(next_point: Point): boolean {  
        let delta_x = next_point.x - this.position.x;
        let delta_y = next_point.y - this.position.y;

        if ((Math.abs(delta_x) == 1 && Math.abs(delta_y) == 2) ||
            (Math.abs(delta_x) == 2 && Math.abs(delta_y) == 1)) {
            return true;
        }
        return false;
    }

    get_barricade_number = function(next_point: Point): [Point[], number] {
        let delta_x = next_point.x - this.position.x;
        let delta_y = next_point.y - this.position.y;

        let barricade_position: Point;
        if (Math.abs(delta_x) == 2) {
            barricade_position = new Point((this.position.x + next_point.x) / 2, this.position.y);

        } else {
            barricade_position = new Point(this.position.x, (this.position.y + next_point.y) / 2);
        }

        return [[barricade_position], 0];
    }
}

class Minister extends BaseChessman {
    get name(): String {
        if (this.camp == Camp.RED) {
            return "象";
        } else {
            return "相";
        }
    }

    check_next_point = function(next_point: Point): boolean {
        next_point = translate_position_to_local(next_point, this._camp);
        let current_point: Point = translate_position_to_local(this.position, this.camp);
        if (!is_in_motherland(next_point)) {
            return false;
        }

        let delta_x = next_point.x - current_point.x;
        let delta_y = next_point.y - current_point.y;
        if (Math.abs(delta_x) == 2 && Math.abs(delta_y) == 2) {
            return true;
        }

        return false;
    }

    get_barricade_number = function(next_point: Point): [Point[], number] {
        let middle_position: Point = new Point((next_point.x + this.position.x) / 2, (next_point.y + this.position.y) / 2);

        return [[middle_position], 0];
    }
}

class StrategicAdviser extends BaseChessman {
    get name(): String {
        return "士";
    }

    check_next_point = function(next_point: Point): boolean {
        next_point = translate_position_to_local(next_point, this._camp);
        let current_point: Point = translate_position_to_local(this.position, this.camp);

        if (!is_in_curt(next_point)) {
            return false;
        }

        let delta_x = next_point.x - current_point.x;
        let delta_y = next_point.y - current_point.y;
        if (Math.abs(delta_x) == 1 && Math.abs(delta_y) == 1) {
            return true;
        }

        return false;
    }

    get_barricade_number = function(next_point: Point): [Point[], number] {
        return [[], 0];
    }
}

class King extends BaseChessman {
    get name(): String {
        if (this.camp == Camp.RED) {
            return "将";
        } else {
            return "帅";
        }
    }

    check_next_point = function(next_point: Point): boolean {
        next_point = translate_position_to_local(next_point, this._camp);
        let current_point: Point = translate_position_to_local(this.position, this.camp);

        if (!is_in_curt(next_point)) {
            return false;
        }
        
        let delta_x = next_point.x - current_point.x;
        let delta_y = next_point.y - current_point.y;
        if (Math.abs(delta_x) + Math.abs(delta_y) == 1 &&
            delta_x * delta_y == 0) {
            return true;
        }

        return false;
    }

    get_barricade_number = function(next_point: Point): [Point[], number] {
        return [[], 0];
    }
}

export {BaseChessman, Soldier, Gun, Car, Horse, Minister, StrategicAdviser, King};
