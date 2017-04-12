export class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public equal(position: Point): boolean {
        return this.x == position.x && this.y == position.y;
    }
}
