import * as THREE from 'three';
import Renderer from './src/Renderer';
import Camera from './src/Camera';
import Light from './src/Light';
import ModelLoader from './src/ModelLoader';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const scene = new THREE.Scene();

const renderer = new Renderer(window.innerWidth, window.innerHeight);

const mainCamera = new Camera(60, window.innerWidth/window.innerHeight, 0.1, 1000);

const light = new Light();
light.addAllLights(scene);

const controls = new OrbitControls( mainCamera.getCamera(), renderer.getRenderer().domElement );

const modelLoader = new ModelLoader();
modelLoader.loadModels(scene);

window.addEventListener('resize', onWindowResize);


const cube = getCube(1, 2, 3, [0, 0, -10]);
scene.add(cube);
const line = getLine();
scene.add(line);

renderer.getRenderer().setAnimationLoop(animate);


function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, mainCamera.getCamera());
}

function onWindowResize() {
    mainCamera.camera.aspect = window.innerWidth / window.innerHeight;
    mainCamera.camera.updateProjectionMatrix();

    renderer.getRenderer().setSize(window.innerWidth, window.innerHeight);
}


function getCube(x, y, z, pos = [0, 0, 0]) {
    const geometry = new THREE.BoxGeometry(x, y, z);
    const material = new THREE.MeshBasicMaterial({color: 0xf0ff00});
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(...pos);
    return cube;
}

function getLine() {
    const material = new THREE.LineBasicMaterial({color: 0x0000ff});
    const points = [];
    points.push(new THREE.Vector3(-10, 0, 10));
    points.push(new THREE.Vector3(0, 10, 10));
    points.push(new THREE.Vector3(10, 0, 10));

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);
    return line;
}

function getWaterTexture() {
    const texture = new THREE.TextureLoader().load('./assets/textures/water.jpg');
    return texture;
}

function getCanvasTexture(text) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 2000;
    canvas.height = 2000;

    context.font = 'Bold 500px Arial';
    context.fillStyle = 'rgba(255, 0, 0, 1)';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    // Create a texture from the canvas
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
}

function getPlane(x, y, texture) {
    const geometry = new THREE.PlaneGeometry(x, y);
    //const texture = getWaterTexture();
    const material = new THREE.MeshBasicMaterial({map: texture, transparent: true});
    const plane = new THREE.Mesh(geometry, material);
    return plane;
}





