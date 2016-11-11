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
      this._events[eventName] = []
    }
    
    if (!_.includes(this._events[eventName], eventFn)) {
      this._events[eventName].push(eventFn)
    }
    
    return this
  }

  removeEvent(eventName) {
    this._events[eventName] = _.pull(this._events[eventName], eventName)
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
