const Database = require('../Database.js');
require("dotenv").config();

let PCID;

module.exports = function(msg, args) {

    PCID = msg.guild.channels.cache.filter(m => m.type === 'category' && m.name == 'Practice Rooms').first().id;

    const user = new Database(msg.author.id, process.env.DBPATH);

    isInPracticeRoom(msg, (isInPracticeRoom) => {
        if(isInPracticeRoom) {
            createUser(msg, user);
        }
    });
}

function createUser(msg, user) {
    if(user.exists() == false) {
        user.create().then(() => {
            return user.update("TotalPracticeTime", 0);
        }).then(() => {
            return user.update("LastRep", "Undefined");
        }).then(() => {
            return user.update("LastRepTime", 0);
        }).then(() => {
            practice(msg, user);
        }).catch(() => {
            console.log("[FATAL] ERROR CREATING NEW USER");
        });
 
    } else {
        practice(msg, user);
    }
}

function practice(msg, user) {
    user.read("IsPracticing").then((isPract) => {
        if(isPract == "true") {
            msg.channel.send(`${msg.author}, (X) You are already practicing!!`);
            return;
        } else {
            user.update("IsPracticing", "true"); 
            user.update("startTimeStamp", Date.now());
            msg.channel.send(`${msg.author}, (X) You are practicing`);
        }
    }).catch(() => {
        // user must of just been created
        user.update("IsPracticing", "true"); 
        user.update("startTimeStamp", Date.now());
        msg.channel.send(`${msg.author}, (X) You are practicing`);
    })
}

function isInPracticeRoom(msg, callback) {
  
    let UID = msg.author.id;

    const vc = msg.guild.channels.cache.filter((c) => c.type == 'voice' && c.parentID == PCID)
    vc.forEach((channel) => {
        let members = channel.members;
        members.forEach((member) => {
            if(member.user.id == UID) {
                callback(true);
                return;
            }
            
        })
      

    });

    callback(false);
    
}