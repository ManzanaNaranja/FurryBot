
const practice = require('./commands/practice.js');
const nomore = require('./commands/nomore.js');
const stats = require('./commands/stats.js');
const song = require('./commands/song.js');
const help = require('./commands/help.js');
let PCID;  // practice category ID
const commands = {practice, nomore, stats, song, help};



module.exports = function (msg) {
    if(msg.author.bot) return;
    PCID = msg.guild.channels.cache.filter(m => m.type === 'category' && m.name == 'Practice Rooms').first().id;

    if(PCID !== msg.channel.parentID) return;
    let tokens = msg.content.split(" ");
        let command = tokens.shift();
        if(command.charAt(0) === "!") {
            command = command.substring(1);
            try {
                commands[command](msg, tokens);
            } catch(err) {
                console.log(err);
                msg.channel.send("Unknown Command");
            }    
        }
}

