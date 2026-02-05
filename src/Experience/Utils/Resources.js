import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { EventEmitter } from './EventEmitter.js'

export class Resources extends EventEmitter {
  constructor(sources) {
    super()

    this.sources = sources
    this.items = {}
    this.toLoad = this.sources.length
    this.loaded = 0

    this.setLoaders()
    this.startLoading()
  }

  setLoaders() {
    this.loaders = {}

    // Texture loader
    this.loaders.textureLoader = new THREE.TextureLoader()

    // Cube texture loader
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()

    // GLTF loader with Draco compression support
    this.loaders.gltfLoader = new GLTFLoader()
    
    // Draco loader for compressed models
    this.loaders.dracoLoader = new DRACOLoader()
    this.loaders.dracoLoader.setDecoderPath('/draco/')
    this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader)
  }

  startLoading() {
    // If no sources, immediately trigger ready
    if (this.toLoad === 0) {
      this.trigger('ready')
      return
    }

    // Update loading bar
    const loadingBarFill = document.getElementById('loading-bar-fill')

    // Load each source
    for (const source of this.sources) {
      switch (source.type) {
        case 'gltfModel':
          this.loaders.gltfLoader.load(
            source.path,
            (file) => {
              this.sourceLoaded(source, file)
              if (loadingBarFill) {
                loadingBarFill.style.width = `${(this.loaded / this.toLoad) * 100}%`
              }
            }
          )
          break

        case 'texture':
          this.loaders.textureLoader.load(
            source.path,
            (file) => {
              this.sourceLoaded(source, file)
              if (loadingBarFill) {
                loadingBarFill.style.width = `${(this.loaded / this.toLoad) * 100}%`
              }
            }
          )
          break

        case 'cubeTexture':
          this.loaders.cubeTextureLoader.load(
            source.path,
            (file) => {
              this.sourceLoaded(source, file)
              if (loadingBarFill) {
                loadingBarFill.style.width = `${(this.loaded / this.toLoad) * 100}%`
              }
            }
          )
          break
      }
    }
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file
    this.loaded++

    if (this.loaded === this.toLoad) {
      this.trigger('ready')
    }
  }
}
