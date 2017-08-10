var data = [{
    'id': 'SD001',
    'title': 'How to order a Skype account?',
    'user': 'Shen, Wei (GIT-IOWS)',
    'description': 'How to order a Skype account?',
    'product': 'Printer',
    'urgency': '4-Low',
    'status': 'In Progress',
    'resolution': ''

},
{
    'id': 'SD002',
    'title': 'I want a printer',
    'user': 'Shen, Wei (GIT-IOWS)',
    'description': 'I want a printer',
    'product': 'Laptop',
    'urgency': '4-Low',
    'status': 'Completed',
    'resolution': 'Please go to IT shop to order the printer.'

}, {
    'id': 'SD004',
    'title': 'need access to Teamspace',
    'user': 'Shen, Wei (GIT-IOWS)',
    'description': 'I need to access to Teamspace',
    'product': 'Desktop',
    'urgency': '3-Medium',
    'status': 'In Progress',
    'resolution': ''

}

];


var reply1 = " Hi, I’m Servicedesk China, I would like to support for your incident.There’s a IT training wiki article you could referred and tried ‘[How to repair your pst file](https://wiki.bshg.com)’.";
var reply2 = "Please read the [description](https://wiki.bshg.com) of the NewOffice Workplace Notebook – Office before your order, additional, which size do your prefer?";
var reply3 = "Thank you for your information, your order was created the ID is [REQ88888](https://wiki.bshg.com).";
var reply4 = "Thank you for contacting IT Servicedesk, we would like to invite you to complete the User Survey for this service!";
var reply5 = "Have a nice day!";
module.exports.data = data;
module.exports.maxId = 100;
module.exports.replies = {
    'reply1': reply1,
    'reply2': reply2,
    'reply3': reply3,
    'reply4': reply4,
    'reply5': reply5
}