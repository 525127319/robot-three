import Material from "./Material";

let distances = {
    Rail1metarial2To3:495,
    Rail2metarial2To3:545,
    metarial14To5: 110,
    metarial24To5: 65,
    metarial16To8: -380,
    metarial26To8: -430,
    metarial19To10: -773,
    metarial29To10: -820,
    defectiveMetaria1ToEnd: -860,
    defectiveMetaria3ToEnd:-875,
    defectiveMetaria5ToEnd:-860,
    defectiveMetaria7ToEnd:-875,
    smtmetarial12To3: 300,
    smtmetarial22To3: 300,
    smtmetarial4To5: 1000,
    smtdefectivemetarial1To3: 1050,
    smtdefectivemetarial2To3: 1050,
};

class RailMetarial extends Material{
    constructor(originalMaterial, animationUtil, name, serialNum){
        super(originalMaterial, animationUtil, name, serialNum);
        this.distance = distances;
        this.event = {'arriveTarget': 'arriveTarget'};
    }

    move(distance,speed){
        super.moveToByX(distance,speed, ()=>{
            //达到第二机器人上料口。
            this.dispatchEvent({type: this.event.arriveTarget});
        });
    }

}

export default RailMetarial;