import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh
} from 'three'
import WebGL from 'three/addons/capabilities/WebGL.js'

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

const cubeGeometry = new BoxGeometry(1, 1, 1)
const cubeMaterial = new MeshBasicMaterial({ color: 'rgb(80, 120, 255)' })
const cubeMesh = new Mesh(cubeGeometry, cubeMaterial)
scene.add(cubeMesh)

camera.position.z = 5

function animate() {
  requestAnimationFrame(animate)

  cubeMesh.rotation.x += 0.003
  cubeMesh.rotation.y += 0.002
  cubeMesh.rotation.z += 0.001
  
  renderer.render(scene, camera)
}

if ( WebGL.isWebGLAvailable() ) {
	animate()
} else {
	// const warning = WebGL.getWebGLErrorMessage()
	// document.body.appendChild( warning )
  console.error('WebGL is not supported by your browser. Please try with another one to run this application')
}
