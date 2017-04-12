import { BaseChessman, Soldier, Gun, Car, Horse, Minister, StrategicAdviser, King } from "../chessman";
import Dictionary from '../libs/typescript-collections/src/lib/Dictionary';
import { Camp } from '../enums/camp';

let red_data: [typeof BaseChessman, number, number][] = [
    [Car, 0, 0],
    [Horse, 1, 0]
]

let black_data: [typeof BaseChessman, number, number][] = [
]

let data: Dictionary<Camp, [typeof BaseChessman, number, number][]> = new Dictionary<Camp, [typeof BaseChessman, number, number][]>();
data.setValue(Camp.RED, red_data);
data.setValue(Camp.BLACK, black_data);

export { data };
