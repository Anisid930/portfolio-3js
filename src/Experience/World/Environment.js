import * as THREE from 'three'
import { Experience } from '../Experience.js'

/**
 * Environment - Lighting, fog, sky with Time of Day system
 * Presets: dawn, morning, noon, afternoon, dusk, night
 */
export class Environment {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene

    // Time of day presets
    this.presets = {
      dawn: {
        sunColor: 0xffa366, sunIntensity: 1.0, sunPos: [5, 3, 8],
        fillColor: 0x6688cc, fillIntensity: 0.2,
        ambientColor: 0x332244, ambientIntensity: 0.4,
        hemiSky: 0xff8855, hemiGround: 0x223344, hemiIntensity: 0.5,
        skyColor: 0xff7744, fogColor: 0x664433, fogNear: 30, fogFar: 120
      },
      morning: {
        sunColor: 0xfff0cc, sunIntensity: 1.4, sunPos: [10, 10, 8],
        fillColor: 0x88bbee, fillIntensity: 0.25,
        ambientColor: 0x556655, ambientIntensity: 0.5,
        hemiSky: 0x88ccee, hemiGround: 0x446644, hemiIntensity: 0.6,
        skyColor: 0x88ccee, fogColor: 0x667766, fogNear: 40, fogFar: 140
      },
      noon: {
        sunColor: 0xfff5e1, sunIntensity: 1.8, sunPos: [12, 18, 8],
        fillColor: 0x88ccff, fillIntensity: 0.3,
        ambientColor: 0x4a6a5a, ambientIntensity: 0.5,
        hemiSky: 0x87ceeb, hemiGround: 0x2d4a3d, hemiIntensity: 0.6,
        skyColor: 0x87ceeb, fogColor: 0x5a7a6a, fogNear: 40, fogFar: 150
      },
      afternoon: {
        sunColor: 0xffe8b0, sunIntensity: 1.5, sunPos: [15, 12, -5],
        fillColor: 0x7799bb, fillIntensity: 0.25,
        ambientColor: 0x556644, ambientIntensity: 0.45,
        hemiSky: 0x99bbdd, hemiGround: 0x445533, hemiIntensity: 0.55,
        skyColor: 0x99bbdd, fogColor: 0x667755, fogNear: 35, fogFar: 130
      },
      dusk: {
        sunColor: 0xff6633, sunIntensity: 0.9, sunPos: [-8, 3, -10],
        fillColor: 0x443366, fillIntensity: 0.15,
        ambientColor: 0x332233, ambientIntensity: 0.35,
        hemiSky: 0xcc5533, hemiGround: 0x221122, hemiIntensity: 0.4,
        skyColor: 0xcc4422, fogColor: 0x442233, fogNear: 25, fogFar: 100
      },
      night: {
        sunColor: 0x4466aa, sunIntensity: 0.3, sunPos: [-5, 8, -5],
        fillColor: 0x223355, fillIntensity: 0.1,
        ambientColor: 0x111122, ambientIntensity: 0.25,
        hemiSky: 0x112244, hemiGround: 0x0a0a15, hemiIntensity: 0.3,
        skyColor: 0x0a0a20, fogColor: 0x0a0a15, fogNear: 15, fogFar: 80
      }
    }

    this.currentPreset = 'noon'
    this.setupLights()
    this.setupSkybox()
    this.applyPreset('noon', false)
  }

  setupLights() {
    this.sunLight = new THREE.DirectionalLight(0xffffff, 1.8)
    this.sunLight.castShadow = true
    this.sunLight.shadow.camera.far = 50
    this.sunLight.shadow.camera.left = -20
    this.sunLight.shadow.camera.top = 20
    this.sunLight.shadow.camera.right = 20
    this.sunLight.shadow.camera.bottom = -20
    this.sunLight.shadow.mapSize.set(512, 512)
    this.sunLight.shadow.normalBias = 0.02
    this.scene.add(this.sunLight)

    this.fillLight = new THREE.DirectionalLight(0x88ccff, 0.3)
    this.scene.add(this.fillLight)

    this.ambientLight = new THREE.AmbientLight(0x4a6a5a, 0.5)
    this.scene.add(this.ambientLight)

    this.hemisphereLight = new THREE.HemisphereLight(0x87ceeb, 0x2d4a3d, 0.6)
    this.scene.add(this.hemisphereLight)

    this.scene.fog = new THREE.Fog(0x5a7a6a, 40, 150)
  }

  setupSkybox() {
    const skyGeo = new THREE.SphereGeometry(200, 8, 8)
    this.skyMaterial = new THREE.MeshBasicMaterial({ color: 0x87ceeb, side: THREE.BackSide })
    this.sky = new THREE.Mesh(skyGeo, this.skyMaterial)
    this.scene.add(this.sky)
  }

  /**
   * Apply a time-of-day preset
   * @param {string} preset - dawn|morning|noon|afternoon|dusk|night
   * @param {boolean} animate - whether to smoothly transition (not implemented, instant)
   */
  setPreset(preset) {
    if (!this.presets[preset]) return
    this.applyPreset(preset, false)
  }

  applyPreset(presetName, animate) {
    const p = this.presets[presetName]
    if (!p) return
    this.currentPreset = presetName

    // Sun
    this.sunLight.color.setHex(p.sunColor)
    this.sunLight.intensity = p.sunIntensity
    this.sunLight.position.set(p.sunPos[0], p.sunPos[1], p.sunPos[2])

    // Fill
    this.fillLight.color.setHex(p.fillColor)
    this.fillLight.intensity = p.fillIntensity
    this.fillLight.position.set(-p.sunPos[0], p.sunPos[1] * 0.5, -p.sunPos[2])

    // Ambient
    this.ambientLight.color.setHex(p.ambientColor)
    this.ambientLight.intensity = p.ambientIntensity

    // Hemisphere
    this.hemisphereLight.color.setHex(p.hemiSky)
    this.hemisphereLight.groundColor.setHex(p.hemiGround)
    this.hemisphereLight.intensity = p.hemiIntensity

    // Sky
    this.skyMaterial.color.setHex(p.skyColor)

    // Fog
    this.scene.fog.color.setHex(p.fogColor)
    this.scene.fog.near = p.fogNear
    this.scene.fog.far = p.fogFar

    console.log(`🌤️ Time of day: ${presetName}`)
  }
}
