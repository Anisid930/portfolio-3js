export class EventEmitter {
  constructor() {
    this.callbacks = {}
    this.callbacks.base = {}
  }

  on(eventName, callback) {
    // Split event name with namespace
    const names = eventName.split('.')
    const name = names[0]
    const namespace = names.length > 1 ? names[1] : 'base'

    // Create namespace if not exists
    if (!this.callbacks[namespace]) {
      this.callbacks[namespace] = {}
    }

    // Create event if not exists
    if (!this.callbacks[namespace][name]) {
      this.callbacks[namespace][name] = []
    }

    this.callbacks[namespace][name].push(callback)

    return this
  }

  off(eventName) {
    // Split event name with namespace
    const names = eventName.split('.')
    const name = names[0]
    const namespace = names.length > 1 ? names[1] : 'base'

    // Remove specific event in namespace
    if (name !== '' && this.callbacks[namespace] && this.callbacks[namespace][name]) {
      delete this.callbacks[namespace][name]
    }
    // Remove all events in namespace
    else if (names.length === 1) {
      delete this.callbacks[namespace]
    }

    return this
  }

  trigger(eventName, args = []) {
    // Split event name with namespace
    const names = eventName.split('.')
    const name = names[0]
    const namespace = names.length > 1 ? names[1] : ''

    // Trigger events
    const triggerCallbacks = (namespace) => {
      if (this.callbacks[namespace] && this.callbacks[namespace][name]) {
        this.callbacks[namespace][name].forEach((callback) => {
          callback.apply(this, args)
        })
      }
    }

    if (namespace === '') {
      // Trigger all namespaces
      for (const ns in this.callbacks) {
        triggerCallbacks(ns)
      }
    } else {
      triggerCallbacks(namespace)
    }

    return this
  }
}
