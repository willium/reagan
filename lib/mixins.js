import _ from 'lodash'

export class Dispatch {}

export let mix = (superclass) => new MixinBuilder(superclass)

class MixinBuilder {  
  constructor(superclass) {
    this.superclass = superclass;
  }

  with(...mixins) { 
    return mixins.reduce((c, mixin) => mixin(c), this.superclass)
  }
}

export let Events = (superclass) => class extends superclass {
  on(eventName, eventFn) {
    this._events = this._events || {}
    
    if (_.isUndefined(this._events[eventName])) {
      this._events[eventName] = new Set()
    }
    
    this._events[eventName].add(eventFn)
    
    return this
  }

  removeEvent(eventName) {
    this._events[eventName].delete(eventName)
    return this
  }

  trigger(eventName, ...args) {
    this._events = this._events || {}
    _.forEach(this._events[eventName], function(listener) {
      listener.apply(this, _.slice(...args, 1))
    })
    return this
  }
}
