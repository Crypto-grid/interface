import * as THREE from 'three'; // (i)orbit controls was not working using this & (ii) below
// import THREE from './three' // orbit controls wasn't working until require in three.js
import { Mesh, Vector3, MathUtils } from 'three';
// import $ = require("jquery");

import $ from "jquery";
import * as bootstrap from "bootstrap";

// import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';// (ii)
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js'
// import { FirstPersonControls } from './FirstPersonControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// import theme from 'utils/theme';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { vertex as basicVertex, fragment as basicFragment } from './shaders/basic';

const KEYS = { // needs a class?? to export
  'a': 65,
  's': 83,
  'w': 87,
  'd': 68,
};

interface IOptions {
  mountPoint: HTMLDivElement;
  width: number;
  height: number;
}

interface IThreeCanvasProps {
  openModal: (props: IThreeCanvasModalProps) => void;
  itemsAppear: (props: IThreeCanvasModalProps) => void;
}

interface IThreeCanvasModalProps {
  name: string;
  scene: THREE.Scene;
}

class ThreeCanvas extends THREE.Scene {
  private readonly keyDown = new Set<string>()
  private directionVector = new THREE.Vector3()
  private renderer: THREE.WebGLRenderer; 
  private composer: any;
  private camera: THREE.PerspectiveCamera;
  //private cubeGroup: THREE.Group;
  private clock: THREE.Clock;
  // private controls: OrbitControls; // limit 
  // private controls: FirstPersonControls;

  private scene?: THREE.Scene;
  private mouse?: THREE.Vector3;
  private raycaster: THREE.Raycaster;
  private canvas: any;
  private modal: any;
  private equipModal: any;
  private props: any;
  private objectName: string;
  private clickCounter: number;
  // private loadingManager: THREE.LoadingManager;
  // private FirstPersonControls: THREE.FirstPersonControls;

  

  constructor(options: IOptions) {
    super();
    const { mountPoint, width, height } = options; // look into mountPoint

    // this is just here for reference. most of this file should be overwritten :)

    // basics
    const clock = this.clock = new THREE.Clock();
    const scene = this.scene = new THREE.Scene();
    const camera = this.camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
    const renderer = this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    const objectName = this.objectName = "";
    // const controls = this.controls = new THREE.OrbitControls(camera, renderer.domElement); 

    // scene.background = new THREE.Color( theme.colors.white );
    renderer.setSize( width, height );
    // camera.position.z = 5;
    camera.position.set(0,0,5);
    
    // const loadingManager = this.loadingManager = new THREE.LoadingManager();
    // loadingManager.onStart = function(url, item, total) {
    //   console.log();
    // }

    // post processing support
    const composer = this.composer = new EffectComposer( renderer );

    const renderPass = new RenderPass( scene, camera );
    renderPass.clear = false;
    composer.addPass( renderPass );

    const mouse = this.mouse = new THREE.Vector3;
    const raycaster = this.raycaster = new THREE.Raycaster
    const canvas = this.canvas = document.getElementById('root');
    const equipModal = this.equipModal = document.getElementById('equipmentSelectionModal')
    // mount to DOM
    mountPoint.appendChild( renderer.domElement );

    const clickCounter = this.clickCounter = 0;

    this.addMeshes(scene);  

    document.addEventListener('keydown', this.handleKeyDown)
		document.addEventListener('keyup', this.handleKeyUp)
    document.addEventListener('mouseup', this.handleClick) //remove orbit controls so no conflict with drag
    // controls.update()
  }
  private handleKeyDown = (event: KeyboardEvent) => {
		this.keyDown.add(event.key.toLowerCase())

    const dir = this.directionVector
 
    this.camera.getWorldDirection(dir)
 
    const speed = 0.1

    const strafeDir = dir.clone()
    const upVector = new THREE.Vector3(0, 1, 0)

    // if (this.keyDown.has('a') || this.keyDown.has('arrowleft'))
    if (event.key ===  'ArrowLeft')
    {
      // this.blaster.rotateY(0.02)
      this.camera.rotateY(0.02)
      // this.camera.position(5)
      // this.camera.position.add(
      //     strafeDir.applyAxisAngle(upVector, Math.PI * 0.5)
      //               .multiplyScalar(speed)
      // )
      console.log("left direction")
    }
    // else if (this.keyDown.has('d') || this.keyDown.has('arrowright')) //event.key ===  'ArrowLeft'
    else if (event.key === 'ArrowRight')
    {
      this.camera.rotateY(-0.02)
      // this.camera.position.add(
      //   strafeDir.applyAxisAngle(upVector, Math.PI * -0.5)
      //             .multiplyScalar(speed)
      // )
      // console.log("left direction")
      // // this.blaster.rotateY(-0.02)
      }
 
     // if (this.keyDown.has('w') || this.keyDown.has('arrowup'))
     if (event.key === 'ArrowUp') //include w key
 
     {
       this.camera.position.add(dir.clone().multiplyScalar(speed))
     }
     // else if (this.keyDown.has('s') || this.keyDown.has('arrowdown')) //event.key === 'ArrowDown' || 
     if (event.key === 'ArrowDown') //include w key
 
     {
       this.camera.position.add(dir.clone().multiplyScalar(-speed))
     }
     // this.controls.update()
	}

	private handleKeyUp = (event: KeyboardEvent) => {
		this.keyDown.delete(event.key.toLowerCase())

		if (event.key === ' ')
		{
			console.log("space-bar pressed") // test
		}
   
	}

  test() {
    alert("testing")
  }

  addMeshes(scene: THREE.Scene) {
    const loader = new THREE.TextureLoader();
    
    const screenTexture = loader.load('./Computer01.png');
    var screenMaterial = new THREE.MeshLambertMaterial({
      map: screenTexture,
      transparent: true,
      depthWrite:false,
      opacity: 0,
      side: THREE.DoubleSide, 
    });
    const screenGeometry = new THREE.PlaneGeometry(2.1,2.1);
    const screenMesh = new THREE.Mesh(screenGeometry, screenMaterial); // combine image and material in mesh
    screenMesh.name = 'Screen';
    screenMesh.position.set(0,0.75,-3); // z should be negative: ;
    scene.add(screenMesh); // move to onclick event // could make transparent then appear on select??

    const testBoxGeometry = new THREE.BoxGeometry(0.5,0.8,1);
    const testBoxMesh = new THREE.Mesh(testBoxGeometry, new THREE.MeshBasicMaterial( {color: 0x000000, transparent: true, opacity: 0} ));
    testBoxMesh.name = 'TestMachine'
    testBoxMesh.position.set(-0.5,-0.8,-3);
    scene.add(testBoxMesh);

    const objLoader = new GLTFLoader();

    // const tableObject = await Promise()
    objLoader.load( './oldtablethreed.glb', function ( gltf ) {
        const model = gltf.scene.children[0];
        model.scale.set(0.5,0.5,0.5);
        model.position.set(0,0,-3);
        scene.add( gltf.scene );
        model.name = 'Table';
    },
    undefined, function ( error ) {
        console.error( error );
    } );

    {
      var light = new THREE.PointLight( 0xffffff, 0.9 );
      // camera.add( light );
      scene.add( light );
    }

    
  }

  public threeMeshAppear (objectName="Screen", scene: THREE.Scene) {
    let mesh = (<THREE.Mesh>scene.getObjectByName(objectName))
    mesh.material.opacity = 1;
  }

  private handleClick = (event: MouseEvent) => {

    if (event.button === 0) { // left button
      console.log("mouse clicked")
      const rect = this.renderer.domElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      console.log("x,y coordinates: ", x, y)

      if (this.mouse != undefined && this.scene != undefined) {
        this.mouse.x = ( x / this.canvas.clientWidth ) *  2 - 1;
        this.mouse.y = ( y / this.canvas.clientHeight) * - 2 + 1;
        console.log("mouse coordinates: ", this.mouse.x, this.mouse.y) // appears to be working
              // update the picking ray with the camera and mouse position
        this.raycaster.setFromCamera( this.mouse, this.camera );
        console.log("scene@@:", this.scene)
        // if (this.scene != undefined) {
          console.log("scene defined")
        // calculate objects intersecting the picking ray
        const intersects = this.raycaster.intersectObjects( this.scene.children, true );
        console.log("intersects: ", intersects)
        if (intersects.length>0) {
          console.log(intersects[0].object);
          this.clickCounter ++;
          // should be on second click
          if (this.clickCounter > 1) {
            this.props.openModal({name: intersects[0].object.name});
          }
          

          // this.threeMeshAppear(this.objectName="Screen", this.scene);
          // this.threeMeshAppe ar(this.objectName="TestMachine", this.scene); this needs to fire also
          //TestMachine

 

          // console.log("screenMaterial: ", screenMaterial.opacity);
        } else {console.log("scene undefined!")}
      // })

    }
  }}
  

  resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    const needResize = canvas.width !== width || canvas.height !== height;

    if (needResize) {
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // use 2x pixel ratio at max
    }

    return needResize;
  }

  public setAnimationLoop(callback: any) { //was type Function - which gave an error
    this.renderer.setAnimationLoop(callback);
  }

  public setProps(props: IThreeCanvasProps) {
    this.props = props;
    this.props.itemsAppear({scene: this.scene})
  }

// update() {//unclear if called??
//   // update
//   this.updateInput()
//   console.log("update ran")
//   // this.updateBullets()
// }
  render() {
    // if ( RESOURCES_LOADED == false ) {

    // }
    // check if we need to resize the canvas and re-setup the camera
    if (this.resizeRendererToDisplaySize(this.renderer)) {
      const canvas = this.renderer.domElement;
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      this.camera.updateProjectionMatrix();
      // this.controls.handleResize();
    }
    this.composer.render(this.scene, this.camera);
    // this.controls.target.z = this.camera.position.z-0.01; 
    // this.controls.update();
  }

}

export default ThreeCanvas;
