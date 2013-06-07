var bind = require('bind');

function Sorter(container, compare) {
  this.container = container;
  this.compare = compare;
  this.components = [];

  container.on('add', bind(this, this.add));
  container.on('remove', bind(this, this.remove));
  container.components.forEach(this.add, this);
}

Sorter.prototype = {

  add: function(component) {
    var cs = this.components;

    for (var i = 0; i < cs.length; i++) {
      if (this.compare(component, cs[i]) == -1) {
        cs.splice(i, 0, component);
        return;
      }
    }

    cs.push(component);
  },

  remove: function(component) {
    var index = this.components.indexOf(component);

    if (index == -1) {
      throw Error('Component not found');
    }

    this.components.splice(index, 1);
  }

};

module.exports = Sorter;
