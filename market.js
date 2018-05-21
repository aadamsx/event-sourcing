'use strict';

const util = require('util');
const Entity = require('sourced').Entity;
const Order = require('./order');

class Market {
  constructor() {
    this.id = null;
    this.orders = [];
    this.trades = [];
    Entity.call(this);
  }

  initialize(id, cb) {
    this.id = id;
    if (cb) cb();
  }

  createOrder(order, cb) {
    this.digest('createOrder', order);

    this.orders.push(new Order(order));

    this.emit('orderCreated', order);
    // this.enqueue('order.created', order);

    if (cb) cb();
  }
}

util.inherits(Market, Entity);

module.exports = Market;
