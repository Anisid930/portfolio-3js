import { Experience } from './Experience/Experience.js'

/**
 * Portfolio 3JS - Interactive 3D Portfolio
 */

// Helper: show error on page
function showError(msg) {
  let el = document.getElementById('_err_overlay')
  if (!el) {
    el = document.createElement('pre')
    el.id = '_err_overlay'
    el.style.cssText = 'position:fixed;top:10px;left:10px;z-index:99999;background:rgba(200,0,0,0.9);color:white;padding:12px 16px;font-size:12px;max-width:80vw;max-height:50vh;overflow:auto;word-wrap:break-word;border-radius:8px;font-family:monospace;'
    document.body.appendChild(el)
  }
  el.textContent += msg + '\n'
}

// Catch all unhandled errors
window.addEventListener('error', (e) => {
  const msg = `❌ ${e.message}\n   ${e.filename}:${e.lineno}`
  console.error(msg)
  showError(msg)
  document.getElementById('loading-screen')?.remove()
})
window.addEventListener('unhandledrejection', (e) => {
  const msg = `❌ Unhandled rejection: ${e.reason}`
  console.error(msg)
  showError(msg)
  document.getElementById('loading-screen')?.remove()
})

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  try {
    const canvas = document.getElementById('webgl')
    if (!canvas) {
      showError('❌ Canvas element #webgl not found in DOM!')
      return
    }

    const experience = new Experience({ canvas })

    if (import.meta.env.DEV) {
      window.experience = experience
    }
  } catch (err) {
    console.error('❌ Experience init failed:', err)
    showError('❌ Experience init failed: ' + err.message + '\n' + err.stack)
    document.getElementById('loading-screen')?.remove()
  }
})
