import { Experience } from './Experience/Experience.js'

/**
 * Portfolio 3JS - Interactive 3D Portfolio
 * Inspired by Bruno Simon's portfolio
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the experience
  const experience = new Experience({
    canvas: document.getElementById('webgl')
  })

  // Expose to window for debugging (remove in production)
  if (import.meta.env.DEV) {
    window.experience = experience
  }
})
