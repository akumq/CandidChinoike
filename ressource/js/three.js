import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";

let renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);
//set up the renderer with the default settings for threejs.org/editor - revision r153
renderer.shadows = true;
renderer.shadowType = 1;
renderer.shadowMap.enabled = true;
renderer.setPixelRatio( window.devicePixelRatio );
renderer.toneMapping = 0;
renderer.toneMappingExposure = 1
renderer.useLegacyLights  = false;
renderer.toneMapping = THREE.NoToneMapping;
renderer.setClearColor(0xffffff, 0);
//make sure three/build/three.module.js is over r152 or this feature is not available. 
renderer.outputColorSpace = THREE.SRGBColorSpace 

const scene = new THREE.Scene();

let cameraList = [];
let objectList = [];

let camera;
let position = 0;

const gltfLoader = new GLTFLoader();
gltfLoader.load('ressource/js/scene.gltf', function(gltf) {
    scene.add(gltf.scene);
    console.log(gltf.scene);

    scene.traverse(function (object) {
        if (object.isCamera) {
            cameraList.push(object);
        }
    });

    console.log(scene.getObjectByName('parchemin'));

    const camPosOriginX = cameraList[0].position.x;
    const camPosOriginY = cameraList[0].position.y;
    const camPosOriginZ = cameraList[0].position.z;

    const camRotationOriginX = cameraList[0].rotation.x;
    const camRotationOriginY = cameraList[0].rotation.y;
    const camRotationOriginZ = cameraList[0].rotation.z;

    camera = cameraList[0];


    updateCameraAspect(camera);

    window.addEventListener('mousedown', function() {
        console.log(position);
        switch(position){
            case 0:
                
                moveCamera(
                    camPosOriginX,
                    camPosOriginY,
                    camPosOriginZ);
                rotateCamera(
                    camRotationOriginX,
                    camRotationOriginY,
                    camRotationOriginZ);
                    
                position = 1;
                console.log(camera)
                updateCameraAspect(camera);
                break;
            case 1:
                moveCamera(
                    cameraList[1].position.x,
                    cameraList[1].position.y,
                    cameraList[1].position.z);
                rotateCamera(
                    cameraList[1].rotation.x,
                    cameraList[1].rotation.y,
                    cameraList[1].rotation.z,
                );
                position = 2;
                console.log(camera)
                updateCameraAspect(camera);
                break;
            case 2:
                moveCamera(
                    cameraList[2].position.x,
                    cameraList[2].position.y,
                    cameraList[2].position.z);
                rotateCamera(
                    cameraList[2].rotation.x,
                    cameraList[2].rotation.y,
                    cameraList[2].rotation.z,
                );
                position = 0;
                console.log(camera)
                updateCameraAspect(camera);
                break;
        }

    });

    
    function moveCamera(x, y, z) {
        gsap.to(camera.position, {
            x,
            y,
            z,
            duration: 3
        });
    }

    function rotateCamera(x, y, z) {
        gsap.to(camera.rotation, {
            x,
            y,
            z,
            duration: 3.2
        });
    }

    animate();
})

// Set the camera aspect ratio to match the browser window dimensions
function updateCameraAspect(camera) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

//A method to be run each time a frame is generated
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};


renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
