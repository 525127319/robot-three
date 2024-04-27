import { EventDispatcher } from "three";
import AnimationUtil from './AnimationUtil';
class Machine {

    constructor(original, animationUtil, name) {
        this.machine = original;
        this.speed = 0.5;
        this.angle = 0;//default angle.
        this.animationUtil = animationUtil;
        this.name = name;
        this.event = {'rotationY': 'rotationY', 'rotationZ': 'rotationZ', 'positionY': 'positionY'};
    }

    /**
     * orientation = 1: 顺
     * orientation = -1: 逆
     * 逆时针，角度越来越大。这里只往一个方向转，由大到小，然后，由小到大
     */
    rotationY(message) {
        let originalAngle = this.machine.rotation.y, tmpAngle = this.machine.rotation.y, orientation;
        if (message.angle > originalAngle){//当目标角度大于原来角度
            orientation = -1;//逆时针
        } else {
            orientation = 1;//顺时针
        }

        let fn = function (angle, orientation) {
            if (orientation === -1){//角度越来越大，逆时针
                tmpAngle += this.speed;
                this.machine.rotation.y = tmpAngle;
            } else {
                tmpAngle -= this.speed
                this.machine.rotation.y =  tmpAngle;
            }

            if ((tmpAngle + this.speed) >= angle && orientation === -1){//逆时针，角度越来越大
                this.machine.rotation.y = angle;
                this.animationUtil.renderOnly();
                this.dispatchEvent( { type: this.event.rotationY, message: message } );
            } else if ((tmpAngle - this.speed) <= angle && orientation === 1){//顺时针，角度越来越小
                this.machine.rotation.y = angle;
                this.animationUtil.renderOnly();
                this.dispatchEvent( { type: this.event.rotationY, message: message } );
                return;
            } else {
                this.animationUtil.render(fn);
            }
               
        }.bind(this, message.angle, orientation);

        fn(message.angle, orientation);
    }

    /**
     * orientation = 1: 顺
     * orientation = -1: 逆
     */
    rotationZ(message, orientation) {
        if (!orientation) {
            orientation = 1;
        }
        let angle = message.angle;
        let fn = function (angle, orientation) {
            this.machine.rotation.z = (this.angle += this.speed) * orientation;
            console.debug('rotationZ', this.angle);
            let _angle = this.angle + this.speed;

            if (_angle >= angle) {
                this.machine.rotation.z = angle * orientation;
                this.animationUtil.renderOnly();
                this.dispatchEvent( { type: this.event.rotationZ, message: message} );
                return;
            }

            if (this.angle <= angle) {
                this.animationUtil.render(fn);
            }
        }.bind(this, angle, orientation);

        fn(angle, orientation);
    }

    positionY(message, orientation){
        if (!orientation){
            orientation = AnimationUtil.positive;
        }
        this.machine.position.y = message.position * orientation;
        this.dispatchEvent( { type: this.event.positionY, message: message} );
        this.animationUtil.renderOnly();
    }

    

}
Object.assign(Machine.prototype, EventDispatcher.prototype);

export default Machine;