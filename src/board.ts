import { HEIGHT_BOARD, WIDTH_BOARD } from './const/consts';
import { Point } from './common/point';
import { Camp } from './enums/camp';
import { BaseChessman } from "./chessman";
import Dictionary from './libs/typescript-collections/src/lib/Dictionary';
import { data } from "./data/default";

export class Board {
    chessman_set: Dictionary<number, BaseChessman> = new Dictionary<number, BaseChessman>();
    _id_count: number = 0;

    private _has_ally_at_position(camp: Camp, position: Point): boolean {
        let chessman: BaseChessman = this.get_chessman_at_position(position);

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

    public get_chessman_at_position(position: Point): BaseChessman {
        let choosen_chessman_list: BaseChessman[] = this.chessman_set.values().filter(chessman => {
            return position.equal(chessman.position) && chessman.is_alive();
        })

        if (choosen_chessman_list.length == 0) {
            return null;
        } else if (choosen_chessman_list.length == 1) {
            return choosen_chessman_list[0];
        }
    }

    private _get_chessman_list_in_path(position_list: Point[]): BaseChessman[] {
        return position_list.map(position => {
            return this.get_chessman_at_position(position);
        }).filter(position => {
            return position != null;
        });
    }

    private _validate_position(position: Point): boolean {
        if (position.x >= 0 && position.x <= WIDTH_BOARD && position.y >=0 && position.y <= HEIGHT_BOARD) {
            return true;
        }
        return false;
    }

    public try_to_move(choose_position: Point, next_position: Point): [boolean, BaseChessman] {
        console.log("move from ", choose_position, " to ", next_position);
        if (!this._validate_position(choose_position) || !this._validate_position(next_position)) {
            return [false, null];
        }

        let choose_chessman = this.get_chessman_at_position(choose_position);
        if (choose_chessman == null) {
            return [false, null];
        }

        let next_position_chessman = this.get_chessman_at_position(next_position);
        if (this._has_ally_at_position(choose_chessman.camp, next_position)) {
            return [false, null];
        }
        // TODO 这里还要检查很多东西
        let [path, barricade_number]: [Point[], number] = choose_chessman.get_barricade_number(next_position);
        if (this._get_chessman_list_in_path(path).length != barricade_number) {
            return [false, null];
        }

        if (!choose_chessman.check_next_point(next_position)) {
            return [false, null];
        }

        return [true, next_position_chessman];
    }

    public move(choose_position: Point, next_position: Point): void {
        if (!this._validate_position(choose_position) || !this._validate_position(next_position)) {
            return null;
        }

        let choose_chessman = this.get_chessman_at_position(choose_position);
        if (choose_chessman == null) {
            return null;
        }

        let next_position_chessman = this.get_chessman_at_position(next_position);
        if (this._has_ally_at_position(choose_chessman.camp, next_position)) {
            return null;
        }
        // TODO 这里还要检查很多东西
        let [path, barricade_number]: [Point[], number] = choose_chessman.get_barricade_number(next_position);
        if (this._get_chessman_list_in_path(path).length != barricade_number) {
            return null;
        }

        if (!choose_chessman.check_next_point(next_position)) {
            return null;
        }
        choose_chessman.position = next_position;
    }

    public dump() {
        console.log("=======================================");
        for (let row = HEIGHT_BOARD - 1; row >= 0; --row) {
            let row_content = "";
            for (let col = 0; col < WIDTH_BOARD; ++col) {
                let chessman: BaseChessman = this.get_chessman_at_position(new Point(col, row));
                if (chessman == null) {
                    row_content += "+ ";
                } else {
                    row_content += chessman.name;
                }
            }
            console.log(row_content);
        }
        console.log("=======================================");
    }
}
