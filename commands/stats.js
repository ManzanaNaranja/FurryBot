const Discord = require('discord.js')
const Database = require('../Database.js');
require("dotenv").config();

module.exports = function(msg, args) {
    

    const user = new Database(msg.author.id, process.env.DBPath);
    if(user.exists()) {
        // user.read("TotalPracticeTime").then((f1) => {
        //     sendEmbed(msg, f1);
        // })

        const f1 = user.read("TotalPracticeTime");
        const f2 = user.read("LastRep");
        const f3 = user.read("LastRepTime");
        Promise.all([
            f1,
            f2,
            f3
        ]).then((data) => {
            sendEmbed(msg, data[0], data[1], data[2]);
        })
    }

    
}



function sendEmbed(msg, f1, f2, f3) {
    console.log(f1);
    const profile = msg.author.avatarURL();
    const embed = new Discord.MessageEmbed()
         .setAuthor(`${msg.author.tag}`)
         .setThumbnail(profile)
         .setColor('#00AAFF')
       //  .setFooter('Today at 4:12 PM')
         .addFields(
            {
                name: 'Total Practice Time',
                value: `Your total time practiced is: ${secToHrs(f1)}`
            },
            {
                name: 'Last Repertoire',
                value: `The last rep you practiced was: ${f2}`
            },
            {
                name: 'Last Repertoire Practice Time',
                value: `You practiced your last rep for: ${secToHrs(f3)}`
            },
         )
    msg.channel.send(embed);
}

function secToHrs(secs) {
    let hrs = Math.floor(secs / 3600);
    let mins = Math.floor((secs - (hrs * 3600))/60);

    return `${hrs}hrs${mins}m.`
}


  


