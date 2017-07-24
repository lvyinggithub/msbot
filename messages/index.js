/*-----------------------------------------------------------------------------
This template demonstrates how to use Waterfalls to collect input from a user using a sequence of steps.
For a complete walkthrough of creating this type of bot see the article at
https://aka.ms/abs-node-waterfall
-----------------------------------------------------------------------------*/
"use strict";
var builder = require("botbuilder");
var botbuilder_azure = require("botbuilder-azure");
var path = require('path');

var sql = require('./sqlHelper.js');

sql.connect();

//var useEmulator = true; // (process.env.NODE_ENV == 'development');
var useEmulator =  (process.env.NODE_ENV == 'development');


var connector = useEmulator ? new builder.ChatConnector() : new botbuilder_azure.BotServiceConnector({
    appId: process.env['MicrosoftAppId'],
    appPassword: process.env['MicrosoftAppPassword'],
    stateEndpoint: process.env['BotStateEndpoint'],
    openIdMetadata: process.env['BotOpenIdMetadata']
});

var bot = new builder.UniversalBot(connector);
bot.localePath(path.join(__dirname, './locale'));


var luis_model_url = "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/342e159a-d628-4be5-ab92-71e7b78a34c6?subscription-key=30bb88b89ec541859a7ab3dfdce72422&verbose=true";
var recognizer = new builder.LuisRecognizer(luis_model_url);
bot.recognizer(recognizer);

bot.dialog('/', [
    function (session) {
        builder.Prompts.text(session, "Hello...Nice to meet you again... What's your name?");
    },
    function (session, results) {
        session.userData.name = results.response;
        builder.Prompts.number(session, "Hi " + results.response + ", How many years have you been coding?");
    },
    function (session, results) {
        session.userData.coding = results.response;
        builder.Prompts.choice(session, "What language do you code Node using?", ["JavaScript", "CoffeeScript", "TypeScript"]);
    },
    function (session, results) {
        session.userData.language = results.response.entity;
        session.send("Got it... " + session.userData.name +
            " you've been programming for " + session.userData.coding +
            " years and use " + session.userData.language + ".");

        // session.question = session.userData.name;
        // session.beginDialog("teamspace");
    }
]);

// bot.dialog('teamspace', require('./teamspace.js')).triggerAction({
//     matches:"Teamspace"
// });


bot.dialog('qna', require('./qna.js')).triggerAction({
    matches:"Teamspace"
});



if (useEmulator) {
    var restify = require('restify');
    var server = restify.createServer();
    server.listen(3978, function () {
        console.log('test bot endpont at http://localhost:3978/api/messages');
    });
    server.post('/api/messages', connector.listen());
} else {
    module.exports = { default: connector.listen() }
}
