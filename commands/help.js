
module.exports = function(msg, args) {
    msg.channel.send(`
***!help*** - for help
***!practice*** - start practicing
***!stats***   - retrieve stats
***!song <songname>***  - set current song
***!nomore***   - end practice
    `)
}

