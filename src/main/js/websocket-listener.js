'use strict';

const SockJS = require('sockjs-client');
// const Stomp = require('stompjs');
require('stompjs');

function register(registrations) {
    const socket = SockJS('/aarestaurants');
    const stompClient = Stomp.over(socket);
    // const stompClient = Stomp.client(socket);
    stompClient.connect({}, function(frame) {
        registrations.forEach(function (registration) { (4)
            stompClient.subscribe(registration.route, registration.callback);
        });
    });
}

module.exports.register = register;
