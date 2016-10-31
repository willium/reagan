import { mix, Dispatch, Events } from './mixins.js'

export class App extends mix(Dispatch).with(Events) {
  constructor() {
    super()
    this.states = {}
    this.views = {}
    this.init()
  }

  init() {}

  // helper function for adding view states to app
  addState(name, state) {
    this.states[name] = state
  }

  // helper function for adding views to app
  addView(name, view) {
    this.views[name] = view
  }

  run() {}

  render(view, state) {
    this.views[view].render(this.states[state])
  }
}