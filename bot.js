require("dotenv").config();

const Discord = require('discord.js');
const client = new Discord.Client();

const Database = require('./Database.js');

client.login(process.env.BOTTOKEN);

client.on('ready', readyDiscord);


function readyDiscord() {
    console.log('LOGGED IN');

    

   
}




const commandHandler = require("./commands");

client.on('message', commandHandler);

client.on('voiceStateUpdate', (oldMember, newMember) => {
    let user = new Database(newMember.id, process.env.DBPATH);
    if(user.exists() == false) {
        user.create("TotalPracticeTime=0\nLastRep=Undefined\nLastRepTime=0\nIsPracticing=false\nstartTimeStamp=0");
        console.log(`[${newMember.id}] USER CREATED`);
    }

    if(userLeavesRoom(oldMember, newMember)) {
        user.read("IsPracticing").then((result) => {
            if(result == "true") { // was practicing and a voicestateupdate means user has left toe room
                user.update("IsPracticing", "false");
                // const c = oldMember.guild.channels.cache.get(oldMember.channelID);
                // console.log(c);

                // NEED TO SEND USER LEFT MESSAGE TO THE TEXT CHANNEL, NOT THE VOICE CHANNEL
            }
        })

    }

})


function userEntersRoom(oldMember, newMember) {
    let oldChannel = oldMember.channelID;
    let newChannel = newMember.channelID;

    return (oldChannel == null && newChannel !== null);
    
   
}

function userLeavesRoom(oldMember, newMember) {
    let oldChannel = oldMember.channelID;
    let newChannel = newMember.channelID;

    return ((newChannel == null && oldChannel !== null) || (newChannel !== null && oldChannel !== null && oldChannel !== newChannel));
}



