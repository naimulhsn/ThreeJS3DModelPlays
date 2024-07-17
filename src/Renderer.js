import * as THREE from 'three';

class Renderer {
    constructor(width, height) {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(width, height);
        document.body.appendChild(this.renderer.domElement);
    }

    getRenderer() {
        return this.renderer;
    }

    render(scene, camera) {
        this.renderer.render(scene, camera);
    }
}

export default Renderer;
