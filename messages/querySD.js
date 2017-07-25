var builder = require("botbuilder");
var data = require("./data.js").data;

// var data = [{
//     'id': 'SD001',
//     'title': 'How to order a Skype account?',
//     'user': 'Shen, Wei (GIT-IOWS)',
//     'description': 'How to order a Skype account?',
//     'impact': '4-Low',
//     'urgency': '4-Low',
//     'status': 'In progress',
//     'resolution': ''

// },
// {
//     'id': 'SD002',
//     'title': 'I want a printer',
//     'user': 'Shen, Wei (GIT-IOWS)',
//     'description': 'I want a printer',
//     'impact': '4-Low',
//     'urgency': '4-Low',
//     'status': 'Complete',
//     'resolution': 'Please go to IT shop to order the printer.'

// }, {
//     'id': 'SD003',
//     'title': 'need access to Teamspace',
//     'user': 'Shen, Wei (GIT-IOWS)',
//     'description': 'I need to access to Teamspace',
//     'impact': '4-Low',
//     'urgency': '3-Medium',
//     'status': 'In progress',
//     'resolution': ''

// }

// ];

function createRecipent(session, result) {

    var img = null;

    if (result.status === "Completed") {
        img = "https://bshbotsjs3sox.blob.core.windows.net/res/complete.png";
    } else {
        img = "https://bshbotsjs3sox.blob.core.windows.net/res/inprogress.png";
    }

    var body = "* User: " + result.user + "\n\n" +
        "* Urgency: " + result.urgency + "\n\n" +
        "* Impact: " + result.impact + "\n\n" +
        "* Status: " + result.status + "\n\n" +
        "* Resolution" + result.resolution + "\n\n";


    return new builder.ThumbnailCard(session)
        .title(result.title)
        .subtitle(result.id)
        .text(body)
        .images([builder.CardImage.create(session, img)]);

    //  return new builder.SigninCard(session).text('bot framework').button('Sign-In','https://');
};

function search(id, sds) {
    var find = null;
    var i = 0;
    for (i = 0; i < sds.length; i++) {
        if (sds[i].id.toLowerCase() === id.toLowerCase()) {
            find = sds[i];
        }
    }

    return find;
}

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
        var result = search(sd, data);

        if (result === null) {

            session.replaceDialog('querysd', { reprompt: true, });
        } else {
            // var result = {
            //     'id': 'SD003',
            //     'title': 'need access to Teamspace',
            //     'user': 'Shen, Wei (GIT-IOWS)',
            //     'description': 'I need to access to Teamspace',
            //     'impact': '4-Low',
            //     'urgency': '3-Medium',
            //     'status': 'In progress',
            //     'resolution': ''

            // };

            var card = createRecipent(session, result);

            var msg = new builder.Message(session);

            msg.addAttachment(createRecipent(session, result));

            session.send(msg);

        }
    }
];