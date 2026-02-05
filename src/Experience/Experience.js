import * as THREE from 'three'
import { Sizes } from './Utils/Sizes.js'
import { Time } from './Utils/Time.js'
import { Camera } from './Camera.js'
import { Renderer } from './Renderer.js'
import { World } from './World/World.js'
import { Resources } from './Utils/Resources.js'
import { sources } from './sources.js'

let instance = null

export class Experience {
  constructor(options = {}) {
    // Singleton pattern
    if (instance) {
      return instance
    }
    instance = this

    // Options
    this.canvas = options.canvas

    // Setup
    this.sizes = new Sizes()
    this.time = new Time()
    this.scene = new THREE.Scene()
    this.resources = new Resources(sources)
    this.camera = new Camera()
    this.renderer = new Renderer()
    this.world = new World()

    // Event listeners
    this.sizes.on('resize', () => this.resize())
    this.time.on('tick', () => this.update())

    // Resources loaded
    this.resources.on('ready', () => {
      this.hideLoadingScreen()
    })
  }

  resize() {
    this.camera.resize()
    this.renderer.resize()
  }

  update() {
    this.camera.update()
    this.world.update()
    this.renderer.update()
  }

  hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen')
    if (loadingScreen) {
      loadingScreen.classList.add('hidden')
    }
  }

  destroy() {
    this.sizes.off('resize')
    this.time.off('tick')

    // Traverse the scene and dispose
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose()
        for (const key in child.material) {
          const value = child.material[key]
          if (value && typeof value.dispose === 'function') {
            value.dispose()
          }
        }
      }
    })

    this.renderer.instance.dispose()
    instance = null
  }
}
