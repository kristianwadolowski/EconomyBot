const commando = require('discord.js-commando');
const Discord = require('discord.js');
var mysql = require('promise-mysql');

var dataBase = new Discord.Collection();

var connection;

 con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Removed",
    database: "economyv1"
  });


class logLog extends commando.Command
{
    constructor(client)
    {
        super(client, {
            name: 'log',
            group: 'log',
            memberName: 'log',
            description: 'Display a log of the most recent events: e!log [number of entries]'
        });
    }
 

    async run(message, args)
    {
        var split;
        var amount;

        var isDM = message.member.roles.exists("name","Dungeon Master");
        var isAdmin = message.member.hasPermission("ADMINISTRATOR");
        if(isDM || isAdmin)
        {
            con.then(function(conn){                
                connection = conn;
                split = args.split(" ");
                amount = split[0];
                amount = parseInt(amount, 10);

                return connection.query('SELECT * FROM log ORDER BY idlog DESC LIMIT '+ amount);
            }).then(function(result){
                for(var i=result.length -1; i>=0; i--)
                {
                    
                    if(result[i].action == "Paid")
                    {
                        message.author.send("Log #"+result[i].idlog+" "+result[i].name2+ " ID["+result[i].account2+"] Paid "+result[i].amount+ " gp to " +result[i].name1 +" ID["+result[i].account1+"]     " + result[i].date);
                    }
                    else if(result[i].action == "Spent")
                    {
                        message.author.send("Log #"+result[i].idlog+" "+result[i].name1+ " ID["+result[i].account1+"] Spent "+result[i].amount+ " gp       " + result[i].date);
                    }
                    else if(result[i].action == "rewarded money")
                    {
                        message.author.send("Log #"+result[i].idlog+" "+result[i].name2+ " rewarded "+result[i].amount +" gp to " +result[i].name1 +" ID["+result[i].account1 +"]     " + result[i].date);
                    }
                    else if(result[i].action == "rewarded experience")
                    {
                        message.author.send("Log #"+result[i].idlog+" "+result[i].name2+ " rewarded "+result[i].amount +" exp to " +result[i].name1 +" ID["+result[i].account1 +"]     " + result[i].date);
                    }
                    else if(result[i].action == "Set money")
                    {
                        message.author.send("Log #"+result[i].idlog+" "+result[i].name2+ " set "+result[i].amount +" gp to " +result[i].name1 +" ID["+result[i].account1 +"]     " + result[i].date);
                    }
                    else if(result[i].action == "Set experience")
                    {
                        message.author.send("Log #"+result[i].idlog+" "+result[i].name2+ " set "+result[i].amount +" exp to " +result[i].name1 +" ID["+result[i].account1 +"]     " + result[i].date);
                    }
                    else if(result[i].action == "Leveled up")
                    {
                        message.author.send("Log #"+result[i].idlog+" "+result[i].name1 + "ID["+result[i].account1+"] Leveled up to level " + result[i].amount + "         " +result[i].date);
                    }
                    else if(result[i].action == "New Profile")
                    {
                        message.author.send("Log #"+result[i].idlog+" "+"New Profile created: Username["+ result[i].name1 +"] Account IDs ["+result[i].account1+"] and ["+result[i].account2+"]     "+ result[i].date);
                    }
                    
                    //console.log(result[i].action);
                }
            });
        }
        else
        {
            message.reply("You do not have permission to use this command.");
        }
    }

}

module.exports = logLog;