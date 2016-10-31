import vg from 'vega'
import { View } from '../view.js'

export class VegaView extends View {
  constructor({selector = null, dimensions = {}, spec = '{}', renderer = 'svg'} = {}) {
    super(selector, dimensions, spec, renderer, (spec, renderer) => 
      new Promise(function(resolve, reject) {
        vg.parse.spec(spec, 
          function(error, view) {
            this.canvas = view({ el: this.selector })
              .width(this.dimensions.width)
              .height(this.dimensions.height)
              .renderer(renderer)
            if (this.canvas) 
              resolve(this.canvas)
            else
              reject('Failure to load view')
          }.bind(this)
        )
      }.bind(this))
    )
  }
}