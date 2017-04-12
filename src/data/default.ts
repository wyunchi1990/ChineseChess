import { BaseChessman, Soldier, Gun, Car, Horse, Minister, StrategicAdviser, King } from "../chessman";
import Dictionary from '../libs/typescript-collections/src/lib/Dictionary';
import { Camp } from '../enums/camp';

let red_data: [typeof BaseChessman, number, number][] = [
    [Soldier, 0, 3],
    [Soldier, 2, 3],
    [Soldier, 4, 3],
    [Soldier, 6, 3],
    [Soldier, 8, 3],
    [Gun, 1, 2],
    [Gun, 7, 2],
    [Car, 0, 0],
    [Horse, 1, 0],
    [Minister, 2, 0],
    [StrategicAdviser, 3, 0],
    [King, 4, 0],
    [StrategicAdviser, 5, 0],
    [Minister, 6, 0],
    [Horse, 7, 0],
    [Car, 8, 0],
]

let black_data: [typeof BaseChessman, number, number][] = [
    [Soldier, 0, 6],
    [Soldier, 2, 6],
    [Soldier, 4, 6],
    [Soldier, 6, 6],
    [Soldier, 8, 6],
    [Gun, 1, 7],
    [Gun, 7, 7],
    [Car, 0, 9],
    [Horse, 1, 9],
    [Minister, 2, 9],
    [StrategicAdviser, 3, 9],
    [King, 4, 9],
    [StrategicAdviser, 5, 9],
    [Minister, 6, 9],
    [Horse, 7, 9],
    [Car, 8, 9],
]

let data: Dictionary<Camp, [typeof BaseChessman, number, number][]> = new Dictionary<Camp, [typeof BaseChessman, number, number][]>();
data.setValue(Camp.RED, red_data);
data.setValue(Camp.BLACK, black_data);

export { data };
