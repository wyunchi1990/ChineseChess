import { Point } from './common/point';
import { Camp } from './enums/camp';
import { BaseChessman } from "./chessman";
import Dictionary from './libs/typescript-collections/src/lib/Dictionary';

class board {
    chessman_set: Dictionary<number, BaseChessman> = new Dictionary<number, BaseChessman>();
    _id_count: number = 0;

    private _has_ally_at_position(camp: Camp, position: Point): boolean {
        let chessman: BaseChessman = this._get_chessman_at_position(position);

        if (chessman == null || chessman.camp != camp) {
            return true;
        }
        return false;
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

    private _get_chessman_at_position(position: Point): BaseChessman {
        this.chessman_set.forEach((id: number, chessman: BaseChessman) => {
            if (position.equal(chessman.position) && chessman.is_alive()) {
                return chessman;
            }
        })
        return null;
    }

    public move(choose_position: Point, next_position: Point): boolean {
        let choose_chessman = this._get_chessman_at_position(choose_position);
        if (choose_chessman == null) {
            return false;
        }
        if (this._has_ally_at_position(choose_chessman.camp, next_position)) {
            return false;
        }
        return true;
    }
}
