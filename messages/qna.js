var builder = require('botbuilder');

var builder_cognitiveservices = require("botbuilder-cognitiveservices");

var recognizer = new builder_cognitiveservices.QnAMakerRecognizer({
                knowledgeBaseId:'cf9b221d-5bd9-462e-a970-6fbc0eaf3aaf', 
    subscriptionKey: 'dd2fbb20bb7d4786bb97105f41c63afd'});

var basicQnAMakerDialog = new builder_cognitiveservices.QnAMakerDialog({
    recognizers: [recognizer],
                defaultMessage: 'Sorry, we can\'t find the answer, please try another term!',
                qnaThreshold: 0.3}
);

module.exports = basicQnAMakerDialog;
