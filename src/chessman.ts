class baseChessman {
    camp: Camp;
    position: Point;

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