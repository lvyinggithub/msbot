var builder = require("botbuilder");
var mockupdata = require("./data.js");
var helper = require("./helper.js");
var data = mockupdata.data;
var maxId = mockupdata.maxId;


module.exports = [
    function (session) {
        builder.Prompts.text("What is your name?");
    },
    function (session,result) {

        session.userData.user = result.response;
        builder.Prompts.text(session, "Hi " + result.response + ", what is the title of your ticket?");
    },
    function (session, results) {
        session.userData.title = results.response;
        builder.Prompts.text(session, "What is the description of your ticket?");
    },
    function (session, results) {
        session.userData.description = results.response;
        builder.Prompts.choice(session, "What is the impact of your ticket?",
            ["1-Top", "2-High", "3-Medium", "4-Low"]);
    },
    function (session, results) {
        session.userData.impact = results.response.entity;
        builder.Prompts.choice(session, "What is the urgency of your ticket?",
            ["1-Top", "2-High", "3-Medium", "4-Low"]);
    },
    function (session, results) {
        session.userData.urgency = results.response.entity;

        var sdNbr = maxId + 1;
        var result = {

            'id': 'SD' + sdNbr,
            'title': session.userData.title,
            'user': session.userData.user,
            'description': session.userData.description,
            'impact': session.userData.impact,
            'urgency': session.userData.urgency,
            'status': 'In Progress',
            'resolution': ''


        };
        data.push(result);

        maxId += 1;

        var card = helper.createThumbnailCard(session, result);
        var msg = new builder.Message(session);
        msg.addAttachment(card);

        session.send('Your ticket as been successfully registered.');
        session.send(msg);

    }

];