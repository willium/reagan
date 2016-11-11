import queue from 'd3-queue'
import * as request from 'd3-request'
import _ from 'lodash'

export class State {
  constructor(model) {
    this.name = this._generateName()
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
    this.q = queue()
    this._loadQueue(a)
    return this
  }

  _loadQueue(item) {
    if (Array.isArray(item)) {
      _.each(item, this._loadData)
    } else {
      const type = _.last(item.url.split('.'))
      this.q.defer(request[type], (item.url, item.row))
    }
  }

  ready(fn) {
    this.q.awaitAll(function(error, results) {
      if (error) throw error
      fn(results)
    })
  }
}