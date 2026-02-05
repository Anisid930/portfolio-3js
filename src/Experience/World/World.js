import { Experience } from '../Experience.js'
import { Environment } from './Environment.js'
import { Floor } from './Floor.js'

export class World {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    // Wait for resources
    this.resources.on('ready', () => {
      // Setup world components
      this.floor = new Floor()
      this.environment = new Environment()
    })

    // Create placeholder objects while loading
    this.createPlaceholders()
  }

  createPlaceholders() {
    // A simple placeholder cube
    // Will be replaced with actual models
  }

  update() {
    // Update world components each frame
    // Add vehicle updates, animations, etc. here
  }
}
