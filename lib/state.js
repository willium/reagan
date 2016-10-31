import * as d3p from 'd3.promise'
import _ from 'lodash'

export class State {
  constructor(model) {
    this.name = this._generateName()
    this.loaded = true
    this._integrate(model)
  }

  _integrate(model) {
    const self = this
    _.forEach(model, function(v, k) {
      self[k] = v
    })
  }

  _generateName() {
    const name_prefix = 'state-'
    return _.uniqueId(name_prefix)
  }

  data(a) {
    this.loaded = false
    if (Array.isArray(a)) {
      let promises = []
      a.forEach(function(o) {
        promises.push(d3p[_.last(o.url.split('.'))](o.url, o.row))
      })
      this.promise = Promise.all(promises)
    } else {
      this.promise = d3p[_.last(a.url.split('.'))](a.url, a.row)
    }

    this.promise.then(function(data) {
      this.loaded = data
    }.bind(this)).catch(function(err) {
      throw err
    })
    
    return this
  }

  ready(fn) {
    if (this.loaded) {
      fn(this.loaded)
    } else {
      this.promise.then(function(...args) {
        fn(...args)
      })
    }
  }
}