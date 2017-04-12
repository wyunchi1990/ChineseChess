import { Camp } from './enums/camp';
import { Point } from './common/point';
import { ChessmanState } from './enums/chessmanState';

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
        return this.position;
    }
    set position(position: Point) {
        this._position =position;
    }

    protected status: ChessmanState;
    death() {
        this.status = ChessmanState.DEATH;
    }
    revive() {
        this.status = ChessmanState.ALIVE;
    }
    is_alive(): boolean {
        return this.status == ChessmanState.ALIVE;
    }

    check_next_point: (Point) => boolean;

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

}

class StrategicAdviser extends BaseChessman {

}

class King extends BaseChessman {

}

export {BaseChessman, Soldier, Gun, Car, Horse, Minister, StrategicAdviser, King};
