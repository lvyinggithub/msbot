var builder = require("botbuilder");

var data = [{
    'id': 'SD001',
    'title': 'How to order a Skype account?',
    'user': 'Shen, Wei (GIT-IOWS)',
    'description': 'How to order a Skype account?',
    'impact': '4-Low',
    'urgency': '4-Low',
    'status': 'In progress',
    'resolution': ''

},
{
    'id': 'SD002',
    'title': 'I want a printer',
    'user': 'Shen, Wei (GIT-IOWS)',
    'description': 'I want a printer',
    'impact': '4-Low',
    'urgency': '4-Low',
    'status': 'Complete',
    'resolution': 'Please go to IT shop to order the printer.'

}, {
    'id': 'SD003',
    'title': 'need access to Teamspace',
    'user': 'Shen, Wei (GIT-IOWS)',
    'description': 'I need to access to Teamspace',
    'impact': '4-Low',
    'urgency': '3-Medium',
    'status': 'In progress',
    'resolution': ''

}

];

function createRecipent(session, result) {
    // return new builder.ReceiptCard(session).title(result.title)
    //     .facts([
    //         builder.Fact.create(session, result.id, 'SD Number'),
    //         builder.Fact.create(session, result.impact, 'Impact'),
    //         builder.Fact.create(session, result.urgency, 'Urgency'),
    //         builder.Fact.create(session, result.status, 'Status')
    //     ]).items([

    //         builder.ReceiptItem.create(session,result.status,'Status')
    //     ]);

    return new builder.SigninCard(session).text('bot framework').button('Sign-In','https://');
};

module.exports = [
    function (session) {
        builder.Prompts.text(session, "Please provide your SD number.");
    },
    function (session, results) {
        var sd = results.response;
        var result = {
            'id': 'SD003',
            'title': 'need access to Teamspace',
            'user': 'Shen, Wei (GIT-IOWS)',
            'description': 'I need to access to Teamspace',
            'impact': '4-Low',
            'urgency': '3-Medium',
            'status': 'In progress',
            'resolution': ''

        };

        return createRecipent(session, result);
    }

];