import _ from 'lodash'
import selection from 'd3-selection'
import { View } from '../view.js'

export class D3View extends View {
  constructor({selector = null, dimensions = {}} = {}) {
    super({type: 'D3', selector: selector, dimensions: dimensions, build: () => 
      function(resolve, reject) {
        let svg
        
        if(_.isString(this.selector)) {
          svg = selection.select(this.selector).append('svg')
        } else {
          svg = this.selector.append('svg')
        }

        this.svg = svg.attr('class', this.name)
        this.canvas = svg.append('g')
        
        this.resize(this.dimensions)
        if (this.canvas) {
          resolve(this.canvas)
        } else {
          reject('Failure to load D3 View')
        }
      }.bind(this)
    })
  }
}