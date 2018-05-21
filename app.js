'use strict';

const bus = require('servicebus').bus();
const Market = require('./market');

// INSTRUCTIONS:
// Start rabbitmq in Terminal with `$ rabbitmq-server`
// Then run `yarn start`

// eslint-disable-next-line
const log = console.log;

const dowJones = new Market();

dowJones.initialize(1);

dowJones.on('orderCreated', (order) => {
  bus.publish('market.orderCreated', {
    command: 'orderCreated',
    data: {
      order
    }
  });
});

bus.subscribe('market.*', (msg) => {
  switch (msg.command) {
    case 'orderCreated':
      log('An order was created!', `ID: ${msg.data.order.id}`);
      break;
    default:
      msg.reject('Command not recognized');
      break;
  }
});

let incrementId = 0;
setInterval(() => {
  dowJones.createOrder({ id: incrementId += 1 });
}, 2000);
