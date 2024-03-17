import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  MeshStandardMaterial,
  MeshPhongMaterial,
  Mesh,
  AmbientLight,
  DirectionalLight,
  PointLight
} from 'three'
import WebGL from 'three/addons/capabilities/WebGL.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const scene = new Scene()
const camera = new PerspectiveCamera(
  75, // FOV (field of view, in degrees)
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1, // Near (elements closer than this value won't be rendered)
  1000 // Far (elements further than this value won't be rendered)
)

const renderer = new WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement) // Attaching the renderer canvas element to the body as a child

const cubeGeometry = new BoxGeometry(10, 1, 10)
const cubeMaterial = new MeshStandardMaterial({ color: 'rgb(255, 255, 255)' })
const cubeMesh = new Mesh(cubeGeometry, cubeMaterial)
scene.add(cubeMesh)
cubeMesh.position.y -= 0.38

const loader = new GLTFLoader()

let porscheGroup

const onLoad = gltf => {
  scene.add(gltf.scene)
  porscheGroup = gltf.scenes[0]
  porscheGroup.rotation.y += Math.PI
}

const onError = error => {
  console.error(error)
}

loader.load(
  '/models/porsche/scene.gltf',
  onLoad,
  undefined,
  onError
)

const white = 'rgb(255, 255, 255)'

const ambientLight = new AmbientLight(white)
scene.add(ambientLight)

// const directionalLight = new DirectionalLight('rgb(255, 255, 255)', 0.5)
// scene.add(directionalLight)

const pointLightOne = new PointLight(white, 100, 100)
pointLightOne.position.set(-5, 0, 0)
scene.add(pointLightOne)

const pointLightTwo = new PointLight(white, 100, 100)
pointLightTwo.position.set(5, 0, 0)
scene.add(pointLightTwo)

const pointLightThree = new PointLight(white, 100, 100)
pointLightThree.position.set(0, 0, 6)
scene.add(pointLightThree)

camera.position.y = 1.5
camera.position.z = 5

function animate() {
  requestAnimationFrame(animate)

  // if (porscheGroup) {
  //   porscheGroup.rotation.y += 0.002
  // }

  // cubeMesh.rotation.x += 0.003
  // cubeMesh.rotation.y += 0.002
  // cubeMesh.rotation.z += 0.001
  
  renderer.render(scene, camera)
}

// document.addEventListener('wheel', e => {
//   porscheGroup.rotation.y += e.wheelDeltaY / 1000
// })

const STEP = 0.1
const MOVE_CAMERA_SPEED = 4

function walk(x, z) {
  camera.position.x += x
  camera.position.z += z
}

function walkX(i) {
  // TODO
}

function walkZ(i) {
  const a = camera.rotation.y
  const x = i * Math.sin(a)
  const z = i * Math.cos(a)

  camera.position.x -= x
  camera.position.z -= z
}

document.addEventListener('keydown', function(event) {
  switch (event.key) {
    case 'w' || 'W':
      walkZ(STEP)
      break
    case 's' || 'S':
      walkZ(-STEP)
      break
    // case 'a' || 'A':
    //   walkX(STEP)
    //   break
    // case 'd' || 'D':
    //   walkX(-STEP)
    //   break
    default:
      break
  }
})

document.addEventListener('mousemove', e => {
  const mouseX = e.clientX / (window.innerWidth / 2) - 1
  const angleToRotate = mouseX * Math.PI
  camera.rotation.y = -(angleToRotate / MOVE_CAMERA_SPEED)
})

if ( WebGL.isWebGLAvailable() ) {
	animate()
} else {
	// const warning = WebGL.getWebGLErrorMessage()
	// document.body.appendChild( warning )
  console.error('WebGL is not supported by your browser. Please try with another one to run this application')
}
