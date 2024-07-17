import * as THREE from 'three';

class Light {
    constructor() {

        this.ambientLight = new THREE.AmbientLight(0xf0f0f0, 1); // soft white light

        this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        this.directionalLight.position.set(5, 10, 7.5);
    }

    addAllLights(scene) {
        scene.add(this.ambientLight);
        scene.add(this.directionalLight);
    }
}

export default Light;
