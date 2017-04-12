import { HEIGHT_BOARD, WIDTH_BOARD } from '../const/consts';
import { Camp } from '../enums/camp';
import { Point } from '../common/point';

function translate_position_to_local(position: Point, camp: Camp): Point {
    if (camp == Camp.RED) {
        return position;
    } else {
        return new Point(WIDTH_BOARD - position.x, HEIGHT_BOARD - position.y);
    }
}

function is_in_curt(position: Point): boolean {
    if (position.x > 5 || position.x < 3 ||
        position.y > 2 || position.y < 0) {
        return false;
    }

    return true;
}

function is_in_motherland(position: Point): boolean {
    if (position.x > 8 || position.x < 0 ||
        position.y > 4 || position.y < 0) {
        return false;
    }

    return true;
}

export { translate_position_to_local, is_in_curt, is_in_motherland }
