
class Animate{
    
    animate(ele,target){
        clearInterval(ele.timer);
        var speed = target>ele.offsetLeft?10:-10;
        ele.timer = setInterval(function () {
            var val = target - ele.offsetLeft;
            ele.style.left = ele.offsetLeft + speed + "px";
            if(Math.abs(val)<Math.abs(speed)){
                ele.style.left = target + "px";
                clearInterval(ele.timer);
            }
        },10)
    }
}

export default new Animate();