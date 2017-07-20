var builder = require('botbuilder');

module.exports = [

    function (session) {
        var message = session.question;
        session.send(message);
        session.endDialog();

    }


];