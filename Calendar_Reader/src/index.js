var Alexa = require('alexa-sdk');
var ical = require('ical');
var http = require('http');
var utils = require('util');

var states = 
{
    SEARCHMODE: '_SEARCHMODE',
    DESCRIPTION: '_DESKMODE',
}

// Local variable holding reference to the Alexa SDK object
var alexa;

// OPTIONAL: replace with "amzn1.ask.skill.[your-unique-value-here]";
var APP_ID = undefined;

// URL to get the .ics from, in this instance we are getting from Moon Phase & Astronomy Calendar
var URL = "https://cantonbecker.com/astronomy-calendar/astrocal.ics";

// Skills name
var skillName = "Events calendar:";

// Message when the skill is first called
var welcomeMessage = "Hello.  You can ask for the events today.  Search for events by date, or say help.  What would you like?";

// Message for help intent
var HelpMessage = "Here are some things you can say: Is there an event today?  Is there an event on the 18th of July?  What are the events next week?  What would you like?";

var descriptionStateHelpMessage = "Here are some things that you can say: Tell me about event one.";

// Used when there is no data within a time period
var NoDataMessage = "Sorry.  There aren't any events scheduled.  Would you ike to search again?";

// Used to tell user skill is closing
var shutdownMessage = "Ok.  See you again soon.";

// Message used when only 1 event is found allowing for difference in punctuation
var oneEventMessage = "There is 1 event ";

// Message used when more than 1 event is found allowing for difference in punctuation
var multipleEventMessage = "There are %d events ";

// Text used after the number of events has been said
var scheduledEventMessage = "scheduled for this time frame.  I've sent the details to your Alexa app: ";

var firstThreeMessage = "Here are the first %d.  ";

// The Values within {} are swapped out for variables
var eventSummary = "The %s event is, %s at %s on %s ";

//Only used for the car on the companion app
var cardContentSummary = "%s at %s on %s ";

// More info text
var haveEventsRepromt = "Give me an event number to hear more information.";

// Error if a date is out of range
var dateOutOfRange = "Date is out of range.  Please choose another date.";

// Error if a event number is out of range
var eventOutOfRange = "Event number is out of range.  Please choose another event.";

// Used when an event is asked for
var descriptionMessage = "Here's the description ";

// Used to close the skill
var killSkillMessage = "Ok, great.  See you next time.";

var eventNumberMoreInfoText = "You can say the event number for more information.";

// Used for title on companion app
var cardTitle = "Events";

// Output for Alexa
var output = "";

// Stores events that are found to be in our date range
var relevantEvents = new Array();

// Adding session handlers