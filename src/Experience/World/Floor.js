import * as THREE from 'three'
import { Experience } from '../Experience.js'

export class Floor {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    this.setGeometry()
    this.setMaterial()
    this.setMesh()
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(100, 100)
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      color: '#2d3748',
      roughness: 0.8,
      metalness: 0.2
    })
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.rotation.x = -Math.PI / 2
    this.mesh.receiveShadow = true
    this.scene.add(this.mesh)
  }
}
