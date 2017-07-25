/*-----------------------------------------------------------------------------
This template demonstrates how to use Waterfalls to collect input from a user using a sequence of steps.
For a complete walkthrough of creating this type of bot see the article at
https://aka.ms/abs-node-waterfall
-----------------------------------------------------------------------------*/
"use strict";
var builder = require("botbuilder");
var botbuilder_azure = require("botbuilder-azure");
var path = require('path');

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


//var luis_model_url = "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/342e159a-d628-4be5-ab92-71e7b78a34c6?subscription-key=30bb88b89ec541859a7ab3dfdce72422&verbose=true";
var luis_model_url = "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/30a1be7e-d080-4bc4-86f9-72f04db269eb?subscription-key=0157389809544280bfd9d66763c7836f&verbose=true";
var recognizer = new builder.LuisRecognizer(luis_model_url);
bot.recognizer(recognizer);

bot.dialog('/', [
    function (session) {
        session.send("Sorry, I can't understand you.");
    }
]);

bot.dialog('qna', require('./qna.js')).triggerAction({
    matches: "QnA"
});

//integrate with querySD
bot.dialog('querysd', require('./querySD.js')).triggerAction({
    matches: "SearchSD"
});

//integrate with querySD
bot.dialog('createsd', require('./createSD.js')).triggerAction({
    matches: "CreateSD"
});

//integrate with qnamaker
// bot.dialog('qna', require('./qna.js')).triggerAction({
//     matches:"Teamspace"
// });



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
