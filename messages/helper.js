var builder = require("botbuilder");

module.exports = {
    search: function (id, sds) {
        var find = null;
        var i = 0;
        for (i = 0; i < sds.length; i++) {
            if (sds[i].id.toLowerCase() === id.toLowerCase()) {
                find = sds[i];
            }
        }
        return find;
    },
    createThumbnailCard: function (session, result) {

        var img = null;

        if (result.status === "Completed") {
            img = "https://bshbotsjs3sox.blob.core.windows.net/res/complete.png";
        } else {
            img = "https://bshbotsjs3sox.blob.core.windows.net/res/inprogress.png";
        }

        var body = "* User: " + result.user + "\n\n" +
            "* Urgency: " + result.urgency + "\n\n" +
            "* Product: " + result.product + "\n\n" +
            "* Status: " + result.status + "\n\n" +
            "* Resolution: " + result.resolution + "\n\n";


        return new builder.ThumbnailCard(session)
            .title(result.title)
            .subtitle(result.id)
            .text(body)
            .images([builder.CardImage.create(session, img)]);
    },

    adpativeCard: function (result) {

        var img = null;
        var color = null;

        if (result.status === "Completed") {
            img = "https://bshbotsjs3sox.blob.core.windows.net/res/complete.png";
            color = "good";
        } else {
            img = "https://bshbotsjs3sox.blob.core.windows.net/res/inprogress.png";
            color = "warning";
        }


        var card = {
            'contentType': 'application/vnd.microsoft.card.adaptive',
            'content': {
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                "type": "AdaptiveCard",
                "version": "0.5",
                "speak": "",
                "body": [
                    {
                        "type": "Container",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": result.title,
                                "size": "bolder"
                            }

                        ]
                    },
                    {
                        "type": "Container",
                        "items": [
                            {
                                "type": "ColumnSet",
                                "columns": [
                                    {
                                        "type": "Column",
                                        "size": "45",
                                        "items": [
                                            // {
                                            //     "type": "TextBlock",
                                            //     "text": result.status,
                                            //     "isSubtle": false,
                                            //     "color": color
                                            // },
                                            {
                                                "type": "Image",
                                                "url": img,
                                                "size": "medium"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "Column",
                                        "size": "55",
                                        "items": [
                                            {
                                                "type": "FactSet",
                                                "facts": [
                                                    {
                                                        "title": "ID:",
                                                        "value": result.id
                                                    },
                                                    {
                                                        "title": "Urgency:",
                                                        "value": result.urgency

                                                    }
                                                    ,
                                                    {
                                                        "title": "Product:",
                                                        "value": result.product
                                                    },
                                                    {
                                                        "title": "Status:",
                                                        "value": result.status
                                                    }

                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ],
                "actions": [
                    {
                        "type": "Action.OpenUrl",
                        "title": "View my ticket",
                        "url": "https://bsh.service-now.com/nav_to.do?uri=%2Fhome.do"
                    }
                ]
            }
        }

        //   var card = {
        //     'contentType': 'application/vnd.microsoft.card.adaptive',
        //     'content': {
        //         "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        //         "type": "AdaptiveCard",
        //         "version": "0.5",
        //         "speak": "Microsoft stock is trading at $62.30 a share, which is down .32%",
        //         "body": [
        //             {
        //                 "type": "Container",
        //                 "items": [
        //                     {
        //                         "type": "TextBlock",
        //                         "text": "Microsoft Corp (NASDAQ: MSFT)",
        //                         "isSubtle": true
        //                     },
        //                     {
        //                         "type": "TextBlock",
        //                         "text": "January 19, 4:00 PM EST",
        //                         "isSubtle": true
        //                     }
        //                 ]
        //             },
        //             {
        //                 "type": "Container",
        //                 "items": [
        //                     {
        //                         "type": "ColumnSet",
        //                         "columns": [
        //                             {
        //                                 "type": "Column",
        //                                 "size": "stretch",
        //                                 "items": [
        //                                     {
        //                                         "type": "TextBlock",
        //                                         "text": "62.30",
        //                                         "size": "extraLarge"
        //                                     },
        //                                     {
        //                                         "type": "TextBlock",
        //                                         "text": "▼ 0.20 (0.32%)",
        //                                         "size": "small",
        //                                         "color": "attention"
        //                                     }
        //                                 ]
        //                             },
        //                             {
        //                                 "type": "Column",
        //                                 "size": "auto",
        //                                 "items": [
        //                                     {
        //                                         "type": "FactSet",
        //                                         "facts": [
        //                                             {
        //                                                 "title": "Open",
        //                                                 "value": "62.24"
        //                                             },
        //                                             {
        //                                                 "title": "High",
        //                                                 "value": "62.98"
        //                                             },
        //                                             {
        //                                                 "title": "Low",
        //                                                 "value": "62.20"
        //                                             }
        //                                         ]
        //                                     }
        //                                 ]
        //                             }
        //                         ]
        //                     }
        //                 ]
        //             }
        //         ]
        //     }
        // }



        return card;
    },
    heroCard: function (session, result) {

        var img = null;

        if (result.status === "Completed") {
            img = "https://bshbotsjs3sox.blob.core.windows.net/res/complete.png";
        } else {
            img = "https://bshbotsjs3sox.blob.core.windows.net/res/inprogress.png";
        }

        var body = "* User: " + result.user + "\n\n" +
            "* Urgency: " + result.urgency + "\n\n" +
            "* Product: " + result.product + "\n\n";


        return new builder.HeroCard(session)
            .title(result.title)
            .subtitle(result.status)
            .text(body)
            .images([
                builder.CardImage.create(session, img)
            ]);

    }
}