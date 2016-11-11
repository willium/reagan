import _ from 'lodash'
import selection from 'd3-selection'

export function cloneSelection(appendTo, toCopy, times) {
  toCopy.each(function() {
    for (let i = 0; i < times; i++) {
      let clone = appendTo.node().appendChild(this.cloneNode(true));
      selection(clone).attr('class', 'clone').attr('id', 'clone-' + i);
    }
  });
  return appendTo.selectAll('.clone');
}

export const either = (a, b) => (_.isUndefined(a) || _.isNaN(a)) ? b : a