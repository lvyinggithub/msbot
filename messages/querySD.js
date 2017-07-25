var builder = require("botbuilder");
var data = require("./data.js").data;
var helper = require("./helper.js");

module.exports = [
    function (session, args) {

        if (args && args.reprompt) {
            builder.Prompts.text(session, "Sorry, we are not able to find the SD number, please try another SD number.")
        } else {
            builder.Prompts.text(session, "Please provide your SD number.");
        }

    },
    function (session, results) {
        var sd = results.response;
        var result = helper.search(sd, data);

        if (result === null) {

            session.replaceDialog('querysd', { reprompt: true, });
        } else {

            var card = helper.createThumbnailCard(session, result);
            var msg = new builder.Message(session);
            msg.addAttachment(card);

            session.send(msg);

        }
    }
];