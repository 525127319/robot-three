import * as THREE from "three";
import FBXLoader from 'three-fbxloader-offical';
// import AxiosHttp from '@/utils/AxiosHttp';
import OrbitControls from 'three-orbit-controls';
import ThreeStats from "./ThreeStats";

let _OrbitControls = OrbitControls(THREE);
let _font = null, stats;
class AnimationUtil{

    constructor(){
        this.speed = 0.3;
        this.loadFont();
        this.initStat();
        this.map = new Map();
    }

    resetAnimation(animations){
        animations = animations[0];
        let tracks = animations.tracks;
        let newAnimation = [];
        //_animation.splice(0, _animation.length);
        tracks.forEach(element => {
            let a = new THREE.AnimationClip(element.name, -1, [element]);
            newAnimation.push(a);
        });
        return newAnimation;
    }

    init(containerId,custom){
        //场景
        this.scene = this.createSence();
        if(custom){ //全景3D相机 渲染器
            //相机
            this.camera = this.createCustomCamera({fov:30});
            //渲染器
            this.renderer = this.createCustomRender(containerId, this.camera);
        }else{
            //相机
            this.camera = this.createCamera({fov: 45});
            //渲染器
            this.renderer = this.createRender(containerId, this.camera);
        }
       
    }

    /**
     * controler: {x:, y:, z: } 
     * cameraConfig: {fov: }
     */
    createCamera(cameraConfig, controler){
        if (!cameraConfig){
            throw new Error('cameraConfig can\'t be null');
        }//fov
        let camera = new THREE.PerspectiveCamera(cameraConfig.fov? cameraConfig.fov :45, 184 / 57, 1, 10000);
        camera.position.set(0, 900,1150);
        let controls = new _OrbitControls(camera);//轨道控制器
        if (controler){
            controls.target.set(0, controler.y ? controler.y : 300, 0);//可以通过参数传进来，暂定
        }
        controls.enableZoom = false;
        controls.update();
        return camera;
    }

    /**
     * 创建scene并加进一丝光
     * 
     */
    createSence(){
        let scene = new THREE.Scene();
        let light = new THREE.HemisphereLight(0xffffff, 0x444444);
        light.position.set(100, 200, 0);
        scene.add(light);
        return scene;
    }

    createRender(containerId){
        let width=0;
        let height=0;
        if(window.innerWidth>3000){
            width=3680
            height=1140
        }else if(window.innerWidth<2000){
            width=1840
            height=570
        }else if(window.innerWidth<3000&&window.innerWidth>2000){
            width=2453
            height=728
        }
        let renderer = new THREE.WebGLRenderer({ antialias: true, alpha:true });
        renderer.setPixelRatio(window.devicePixelRatio);
 
        renderer.setSize(width, height);
        // renderer.shadowMap.enabled = true;
        let animation = document.getElementById(containerId);
        animation.appendChild(renderer.domElement);
        // let _fn = function(){
        //     this.camera.aspect = 184 /57;
        //     this.camera.updateProjectionMatrix();
        //     this.renderer.setSize(width, height);
        // }.bind(this);
        // window.addEventListener('resize', _fn, false);
        return renderer;
    }

    //物流看板渲染器
    createCustomRender(containerId){
        let width;
        let height;
        if(window.innerWidth>2570){
            width=3680
            height=1680
        }else if(window.innerWidth<2500){
            width=1840
            height=840
        }else if(window.innerWidth<3000&&window.innerWidth>2500){
            width=2453
            height=1120
        }
        let renderer = new THREE.WebGLRenderer({ antialias: true, alpha:true });
        renderer.setPixelRatio(window.devicePixelRatio);
 
        renderer.setSize(width, height);
        let animation = document.getElementById(containerId);
        animation.appendChild(renderer.domElement);
        let _fn = ()=>{
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
             renderer.setSize(width, height);
        };
       
        window.addEventListener('resize', _fn, false);
        return renderer;
    }

    //物流看板相机
    createCustomCamera(cameraConfig, controler){
        if (!cameraConfig){
            throw new Error('cameraConfig can\'t be null');
        }//fov
        let camera = new THREE.PerspectiveCamera(cameraConfig.fov? cameraConfig.fov :45, 16 / 9, 1, 10000);
        camera.position.set(0, 600,1300);
        let controls = new _OrbitControls(camera);//轨道控制器
        if (controler){
            controls.target.set(0, controler.y ? controler.y : 300, 0);//可以通过参数传进来，暂定
        }
        controls.enableZoom = false;
        controls.update();
        return camera;
    }

    loadFbx(url){
        let scene = this.scene;
        let promise = new Promise((resolve, reject)=>{
            let loader = new FBXLoader();
            loader.load(url, (object) => {
                scene.add(object);
                resolve(object);
            }, ()=>{}, (error)=>{
                reject(error);
            });
        });
       
        return promise;
    }

    loadFont(){
        if (_font){
            return Promise.resolve(_font);
        }
        let promise = new Promise((resolve, reject)=>{
            let loader = new THREE.FontLoader();
            loader.load('/font/ZH_CN.json', (font)=>{
                _font = font;
                resolve(font);
            });
        });
        return promise;
    }

/**
     * 生成3D文字， 输出是字体模型
     * 
     * @param {*} word 输出的文字
     * @param {*} option 字体配置选项
     */
    generateFont(word, option) {
        if (!word) throw new Error('word can\' be empty!');

        let _option = {
            size: 40,
            height: 10,
            curveSegments: 5
        };
        if (option)
            _option = Object.assign(_option, option);

        return this.loadFont().then(font => {
            _option.font = font;
            var geometry = new THREE.TextGeometry(word, _option);
            geometry.computeBoundingBox()
            var materials = [
                new THREE.MeshBasicMaterial({ color: 0XFF0000, overdraw: 0.5 }),
                new THREE.MeshBasicMaterial( { color: 0x000000, overdraw: 0.5 } )
            ];
            return new THREE.Mesh(geometry, materials);
        });
    }

    getAnimation(object){
        return null;
    }

    render(fn){
        this.renderer.render(this.scene, this.camera);
        //stats.update();
        requestAnimationFrame(fn);
    }

    renderOnly(){
        //stats.update();
        this.renderer.render(this.scene, this.camera);
    }

    initStat(){
            stats = new ThreeStats().getInstance();
            stats.setMode(0); // 0: fps, 1: ms
    
            // Align top-left
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.left = '0px';
            stats.domElement.style.top = '0px';
    
            // document.body.appendChild(stats.domElement);
    }

    getMeshByName(object, name){
        let map = null;
        if (!this.map.has(object.id)){
            map = new Map();
            this.map.set(object.id, map);
        } else {
            map = this.map.get(object.id);
        }
        if (map.has(name))
            return map.get(name);
        return this.getMesh(object.children, name, map);
    }

    getMesh(children, name, map){
        for (let index = 0; index < children.length; index++) {
            const _mesh = children[index];
            if (!map.has(_mesh.name))
                map.set(_mesh.name, _mesh);
            if (_mesh.name === name){
                return _mesh;
            } else if ('Group' === _mesh.type){
                let m = this.getMesh(_mesh.children, name, map);
                if (m  && m.name === name){
                    return m;
                }
            }
        }
    }

}

AnimationUtil.positive = 1;//顺时针
AnimationUtil.negative = -1;//逆时针

export default AnimationUtil;