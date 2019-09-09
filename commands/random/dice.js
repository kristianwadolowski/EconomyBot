const commando = require('discord.js-commando');
const Discord = require('discord.js');
class diceCommand extends commando.Command
{
    constructor(client)
    {
        super(client, {
            name: 'dice',
            group: 'random',
            memberName: 'dice',
            description: 'Rolls a die'
        });
    }

    async run(message, args)
    {

        function makeid() {
        var text = "";
         var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

             return text;
        }
        
        var roll = Math.floor(Math.random()*100);
        message.reply("You rolled a " + roll);
    }
}

module.exports = diceCommand;