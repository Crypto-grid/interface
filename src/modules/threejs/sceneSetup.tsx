// import * as THREE from 'three';
// // import THREE from './three'
// import LevelScene from './LevelScene';

// const width = window.innerWidth
// const height = window.innerHeight


// const renderer = new THREE.WebGLRenderer({
// 	canvas: document.getElementById('ThreeJsCanvas') as HTMLCanvasElement
// })

// renderer.setSize(width, height)

// const mainCamera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100)

// const scene = new LevelScene(mainCamera)
// scene.initialize()

// function tick()
// {
// 	scene.update()
// 	renderer.render(scene, mainCamera)
// 	requestAnimationFrame(tick)
// }

// tick()


import { useEffect } from 'react';

import * as THREE from 'three';

import SceneInit from './lib/SceneInit';

function App() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    test.animate();

    const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
    const boxMaterial = new THREE.MeshNormalMaterial();
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

    test.scene.add(boxMesh);
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;