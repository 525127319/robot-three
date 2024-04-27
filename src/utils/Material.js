import { EventDispatcher } from "three";

class Material{
    constructor(originalMaterial, animationUtil, name, serialNum){
        this.meterial = originalMaterial;
        this.animationUtil = animationUtil;
        this.name = name;
        this.count = 0;
        this.railNum = 0;//转道号1||2
        //add: 添加物料时候， reduce: 取走物料
        this.event = {'moveto': 'moveto', 'add': 'add', 'reduce': 'reduce'};
        this.serialNum = serialNum;
        // this.speed = 8;
        this.defaultPostionX = this.meterial.position.x; 
    }

    moveToByX(distance, speed = 12,callback){
        let direction = true;//正方向
        if (this.meterial.position.x > distance){
            direction = false;
        }
        let a = function(){
            if (direction){
                this.meterial.position.x = this.meterial.position.x +speed;
                if (this.meterial.position.x >= distance){
                    callback();
                    return;
                } else {
                    this.animationUtil.render(a);
                }
            } else {
                this.meterial.position.x = this.meterial.position.x - speed;
                if (this.meterial.position.x <= distance){
                    callback();
                    return;
                } else {
                    this.animationUtil.render(a);
                }
            }
            
            
        }.bind(this, direction);

        a(direction);
    }

    disable(){
        this.meterial.visible = false;
    }

    block(){
        this.meterial.visible = true;
    }

    isVisible(){
        return this.meterial.visible;
    }

    count(){
        return this.count;
    }

    add(tester_name){
       this.count++;
       this.dispatchEvent( { type: this.event.add, message: {tester_mess:tester_name} } );
       if (this.meterial.visible === false){
            this.meterial.visible = true;
        }
    }

    reduce(){
        this.count--;
        //this.dispatchEvent( {type: this.event.reduce, message: this.count } );
        if (this.count <= 0){
            this.meterial.visible = false;
        }
    }

    setRailNum(railNum){
        this.railNum = railNum;
    }

    reset(){
        this.meterial.position.x = this.defaultPostionX; 
    }

}

Object.assign(Material.prototype, EventDispatcher.prototype);

export default Material;