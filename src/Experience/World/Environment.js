import * as THREE from 'three'
import { Experience } from '../Experience.js'

export class Environment {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    this.setSunLight()
    this.setAmbientLight()
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight('#ffffff', 2)
    this.sunLight.castShadow = true
    this.sunLight.shadow.camera.far = 50
    this.sunLight.shadow.camera.left = -20
    this.sunLight.shadow.camera.top = 20
    this.sunLight.shadow.camera.right = 20
    this.sunLight.shadow.camera.bottom = -20
    this.sunLight.shadow.mapSize.set(2048, 2048)
    this.sunLight.shadow.normalBias = 0.05
    this.sunLight.position.set(5, 10, 7.5)
    this.scene.add(this.sunLight)
  }

  setAmbientLight() {
    this.ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
    this.scene.add(this.ambientLight)
  }

  setEnvironmentMap() {
    // Set up environment map for reflections
    // Add when you have an HDRI or cube texture
    // this.environmentMap = this.resources.items.environmentMapTexture
    // this.scene.environment = this.environmentMap
  }
}
