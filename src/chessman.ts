import { Camp } from './enums/camp';
import { Point } from './common/point';

class baseChessman {
    camp: Camp;
    position: Point;
    id: number;

    constructor(camp: Camp, position: Point) {
        this.camp = camp;
        this.position = position;
    }
}

class soldier extends baseChessman {

}

class gun extends baseChessman {

}

class car extends baseChessman {

}

class horse extends baseChessman {

}

class minister extends baseChessman {

}

class strategicAdviser extends baseChessman {

}

class king extends baseChessman {

}

export {baseChessman, soldier, gun, car, horse, minister, strategicAdviser, king};
