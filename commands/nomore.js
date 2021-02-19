const Database = require('../Database.js');
require("dotenv").config();

module.exports = function(msg, args) {


    const user = new Database(msg.author.id, process.env.DBPATH);

    user.read("IsPracticing").then((value) => {
        if(value == "true") {
            let endtime = Date.now();
            let timePracticed;
            user.read("startTimeStamp").then((starttime) => {
                timePracticed = Math.floor((endtime - starttime)/1000); // in seconds
                user.update("LastRepTime", timePracticed);
                user.read("TotalPracticeTime").then((total) => {
                    user.update("TotalPracticeTime", (Number(total) + timePracticed));
                }).catch(() => {
                    console.log("[FATAL] Failed to read total time practice");
                })
            })
            user.update("IsPracticing", "false");
            msg.channel.send(`${msg.author}, Ok, you're no longer practicing.`);
        } else {
            msg.channel.send(`${msg.author}, You aren't currently practicing!`);
        }
    }).catch(() => {
        msg.channel.send(`${msg.author}, You aren't currently practicing!`);
    });
    
   
    




    
    



}