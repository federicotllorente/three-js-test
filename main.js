import { Scene, PerspectiveCamera, WebGLRenderer } from 'three'

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
