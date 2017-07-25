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

        var body = "* # User: " + result.user + "\n\n" +
            "* # Urgency: " + result.urgency + "\n\n" +
            "* # Impact: " + result.impact + "\n\n" +
            "* # Status: " + result.status + "\n\n" +
            "* # Resolution: " + result.resolution + "\n\n";


        return new builder.ThumbnailCard(session)
            .title(result.title)
            .subtitle(result.id)
            .text(body)
            .images([builder.CardImage.create(session, img)]);
    }
}