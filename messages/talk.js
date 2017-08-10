var builder = require("botbuilder");
var data = require('./data.js');

module.exports = [
    function (session) {

        builder.Prompts.text(session, data.replies.reply1);

    },
 
    function (session, results) {
        builder.Prompts.choice(session, data.replies.reply2,
         ["-- None --", "Small (12\") [add 790,00€]", "Medium (14\") [add 730,00€]","Unknow"]);
           // ["-- None --", "Small (12) [add 790,00€]", "Medium (14) [add 730,00€]"]);
    }, function (session, results) {
        // session.send(data.replies.reply4);
        builder.Prompts.text(session, data.replies.reply3);
    }, function (session, results) {
        //   session.send(data.replies.reply5);
        session.send(data.replies.reply4);
        session.send(data.replies.reply5);
        session.endDialog();
    }
];