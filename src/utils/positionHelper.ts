import { HEIGHT_BOARD, WIDTH_BOARD } from '../const/consts';
import { Camp } from '../enums/camp';
import { Point } from '../common/point';

function translate_position(position: Point, camp: Camp): Point {
    if (camp == Camp.RED) {
        return position;
    } else {
        return new Point(WIDTH_BOARD - position.x, HEIGHT_BOARD - position.y);
    }
}
