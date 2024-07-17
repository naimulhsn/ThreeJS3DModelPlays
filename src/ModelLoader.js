import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

class ModelLoader {
    constructor() {
        this.loadedModels = [];
        this.GLTFLoader = new GLTFLoader();
        this.ObjLoader = new OBJLoader();
    }

    // loadModel(path, onLoad, onProgress, onError) {
    //     this.loader.load(path, onLoad, onProgress, onError);
    // }

    async loadModels(scene) {
        this.loadGLTFModel("assets/models/ferrari_458_italia.glb").then(model => {
            model.scale.set(.05,.05,.05);
            model.position.set(0, 0, 20);
            scene.add(model);
            this.loadedModels.push(model.name);
        }).catch(err => {
            console.log("Could not Load the GLTF model. error: ", err);
        });


        this.loadObjModel("./assets/models/3DxHouse.obj").then(model=>{
            model.position.set(0, 0, -10);
            scene.add(model);
            this.loadedModels.push(model.name);
        }).catch(err=>{
            console.log("Could not Load the Obj model. error: ", err);
        });


    }

    async loadGLTFModel(modelPath) {
        return new Promise((resolve, reject) => {
            this.GLTFLoader.load(
                modelPath,
                (gltf) => {
                    resolve(gltf.scene); // Resolve with the scene
                },
                function (xhr) {
                    console.log(modelPath + ' ' + (xhr.loaded / xhr.total * 100) + '% loaded');
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    async loadObjModel(modelPath) {
        return new Promise((resolve, reject) => {
            this.ObjLoader.load(modelPath, model => {
                    resolve(model)
                },
                xhr => {
                    console.log(modelPath + ' ' + (xhr.loaded / xhr.total * 100) + '% loaded');
                },
                error => {
                    reject(error);
                }
            )
        });
    }
}

export default ModelLoader;
