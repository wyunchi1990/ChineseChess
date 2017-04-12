import { Point } from './common/point';
import { Camp } from './enums/camp';
import { BaseChessman } from "./chessman";
import Dictionary from './libs/typescript-collections/src/lib/Dictionary';
import { data } from "./data/default";

class board {
    chessman_set: Dictionary<number, BaseChessman> = new Dictionary<number, BaseChessman>();
    _id_count: number = 0;

    private _has_ally_at_position(camp: Camp, position: Point): boolean {
        let chessman: BaseChessman = this._get_chessman_at_position(position);

        if (chessman == null || chessman.camp != camp) {
            return false;
        }
        return true;
    }

    private _generate_id(): number {
        return this._id_count++;
    }

    private _init(data: Dictionary<Camp, [typeof BaseChessman, number, number][]>) {
        data.forEach((camp: Camp, camp_list: [typeof BaseChessman, number, number][]) => {
            camp_list.forEach(element => {
                let id: number = this._generate_id();
                let [type, x, y]: [typeof BaseChessman, number, number] = element;
                let chessman: BaseChessman = new type(camp, x, y, id);
                this.chessman_set.setValue(id, chessman);
            })
        })
    }

    constructor(data: Dictionary<Camp, [typeof BaseChessman, number, number][]>) {
        this._init(data);
    }

    public _get_chessman_at_position(position: Point): BaseChessman {
        let choosen_chessman_list: BaseChessman[] = this.chessman_set.values().filter(chessman => {
            return position.equal(chessman.position) && chessman.is_alive();
        })

        if (choosen_chessman_list.length == 0) {
            return null;
        } else if (choosen_chessman_list.length == 1) {
            return choosen_chessman_list[0];
        }
    }

    public move(choose_position: Point, next_position: Point): boolean {
        let choose_chessman = this._get_chessman_at_position(choose_position);
        if (choose_chessman == null) {
            return false;
        }
        if (this._has_ally_at_position(choose_chessman.camp, next_position)) {
            return false;
        }
        // TODO 这里还要检查很多东西
        if (!choose_chessman.check_next_point(next_position)) {
            return false
        }
        choose_chessman.position = next_position;
        return true;
    }
}

let b: board = new board(data);
let move_result = b.move(new Point(0, 0), new Point(0, 1));
console.log(move_result, b._get_chessman_at_position(new Point(0, 1)));
move_result = b.move(new Point(0, 1), new Point(4, 2));
// console.log(b.chessman_set.values());
console.log(move_result);
