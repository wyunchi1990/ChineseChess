import Camp from 'enums.camp'

function translate_position(position: Point, camp: Camp): Point {
    if (camp == Camp.RED) {
        return position;
    } else {
        return Point(WIDTH_BOARD - position.x, HEIGHT_BOARD - position.y);
    }
}