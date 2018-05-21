'use strict';

const util = require('util');
const Entity = require('sourced').Entity;

class Order {
  constructor(order) {
    this.id = order.id || null;
    Entity.call(this);
  }

  initialize(id, cb) {
    this.id = id;
    if (cb) cb();
  }
}

util.inherits(Order, Entity);

module.exports = Order;
