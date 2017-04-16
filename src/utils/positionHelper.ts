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

function get_point_in_segment(start_position: Point, end_position: Point): Point[] {
    let point_list: Point[] = [];

    if (start_position.x == end_position.x) {
        let sign: number;
        if (end_position.y > start_position.y) {
            sign = 1;
        } else {
            sign = -1;
        }

        let y = start_position.y + sign;
        while (true) {
            if (y == end_position.y) {
                break;
            }
            point_list.push(new Point(start_position.x, y));
            y += sign;
        }
    } else {
        let sign: number;
        if (end_position.x > start_position.x) {
            sign = 1;
        } else {
            sign = -1;
        }

        let x = start_position.x + sign;
        while (true) {
            if (x == end_position.x) {
                break;
            }
            point_list.push(new Point(x, start_position.y));
            x += sign;
        }
    }

    return point_list;
}

export { translate_position_to_local, is_in_curt, is_in_motherland, get_point_in_segment }
