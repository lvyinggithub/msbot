var builder = require('botbuilder');
var request = require('request');

module.exports = [

    function (session) {
        var params= {
            'question':'what is teamspace'
        };

        var requestData = {
            url:"https://westus.api.cognitive.microsoft.com/qnamaker/v2.0/knowledgebases/cf9b221d-5bd9-462e-a970-6fbc0eaf3aaf/generateAnswer?"+ $.param(params),
            headers:{
                'Content-Type':'application/json',
                'Ocp-Apim-Subscription-Key':'dd2fbb20bb7d4786bb97105f41c63afd'
            }
        };
    
        request.post(requestData,function(error, respose, body){
            console.log(error);
            console.log(response);
            console.log(body);
        });
        session.send("hello");

        session.endDialog();

    }


];