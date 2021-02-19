const Database = require('../Database.js');
require("dotenv").config();

module.exports = function(msg, args) {
    const user = new Database(msg.author.id, process.env.DBPath);
    if(user.exists()) {
        user.read("IsPracticing").then((isPract) => {
            if(isPract == "true") {
                user.update("LastRep", args[0]);
                msg.reply("Done");
            } else {
                msg.reply("You are not currently practicing!");
            }
        }).catch(() => {
            console.log("[FATAL] IsPracticing could not be read");
        })
        
    }
    

}