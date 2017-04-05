'use strict';
var APP_ID = undefined;
var Alexa = require('alexa-sdk');
var SPEECH_OUTPUT = 'Hello';

var GreetService = function() {
    Alexa.call(this, APP_ID);
};
GreetService.prototype = Object.create(Alexa.prototype);

var helloResponseFunction = function(intent, session, response) {
    response.tell(SPEECH_OUTPUT);
};

GreetService.prototype.eventHandlers.onLaunch = helloResponseFunction;

GreetService.prototype.intentHandlers = {
    'HelloWorldIntent': helloResponseFunction
};

exports.handler = function(event, context) {
    var greetService = new GreetService();
    greetService.execute(event, context);
};