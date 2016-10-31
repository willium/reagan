import _ from 'lodash'

import { mix, Dispatch, Events } from './mixins.js'
import { either } from './utils.js'

export class View extends mix(Dispatch).with(Events) {
  constructor({selector = null, dimensions = {}, spec = '{}', renderer = 'svg', build = () => {}} = {}) {
    super()
    this.svg, this.canvas, this.width, this.height, this.margin

    this.name = this._generateName()
    
    this.selector = `.view[data-view="${selector}"]`
    this.dimensions = dimensions
    
    this.spec = spec
    this.renderer = renderer

    this.build = build

    if (!_.isUndefined(this.init) && _.isFunction(this.init)) {
      this.build.then((canvas) => this.init(canvas, ...arguments))
    }
  }

  _generateName() {
    const name_prefix = 'view-'
    return _.uniqueId(name_prefix)
  }
  
  resize(dimensions) {
    if (_.isNumber(dimensions.margin)) {
      const m = dimensions.margin
      dimensions.margin = { top: m, bottom: m, left: m, right: m }
    }

    this.margin = either(dimensions.margin, this.margin)

    this.width = either(dimensions.width - this.margin.left - this.margin.right, this.width)
    this.height = either(dimensions.height - this.margin.top - this.margin.bottom, this.height)

    this.svg
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
    this.canvas
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')')
  }

  init() {}

  render() {}
}