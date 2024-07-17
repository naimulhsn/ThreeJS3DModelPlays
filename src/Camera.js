import * as THREE from 'three';

class Camera {
    constructor(fov, aspect, near, far) {
        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        this.camera.position.set(0, 0, 5);
        this.camera.lookAt(0, 0, 0);
    }

    getCamera() {
        return this.camera;
    }
}

export default Camera;
