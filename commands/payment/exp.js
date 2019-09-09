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

class expPayment extends commando.Command
{
    constructor(client)
    {
        super(client, {
            name: 'exp',
            group: 'payment',
            memberName: 'exp',
            description: '(Admin only) Reward exp to an account: e!exp [recipient\'s ID] [amount] '
        });
    }

        
    async run(message, args)
    {
        var usr;
        var split;
        var accId;
        var amount;
        var newTotal;
        var newlvl;
        var nxtlvl;
        var name;

            var chnl =  message.guild.channels.find("name", "econ-bot-log");
            var isDM = message.member.roles.exists("name","Dungeon Master");
            var isAdmin = message.member.hasPermission("ADMINISTRATOR");
            if(isDM || isAdmin)
            {
                con.then(function(conn){

                    connection = conn;
                    usr = message.author.id;
                    split = args.split(" ");
                    accId = split[0];
                    amount = split[1];
                    amount = parseInt(amount, 10);
                            
                    }).then(function(){
                        return connection.query("SELECT * FROM accounts WHERE accountId = '"+ accId+"'");
                    }).then(function(result){
                        if(result < 1)
                        {
                            message.reply("There is no account with that ID");
                            return 0;
                        }
                        else
                        { 
                            if (amount >= 0)
                            {
                                newTotal = result[0].exp + amount;
                                nxtlvl = result[0].nxtlvl;
                                nxtlvl = nxtlvl - amount;
                                name = result[0].accountName;
                                return 1;
                            }
                            else
                            {
                                message.reply("You can't just take exp from players like that.");
                                return 0;
                            }
                        }
                    }).then(function(y){
                        if(y == 1)
                        {
                            if(nxtlvl <= 0){
                                if( newTotal < 9000)
                                {
                                    newlvl = 3;
                                    nxtlvl = 9000 - newTotal;
                                }
                                else if(newTotal < 15000)
                                {
                                    newlvl = 4;
                                    nxtlvl = 15000 - newTotal;
                                }
                                else if(newTotal < 23000)
                                {
                                    newlvl = 5;
                                    nxtlvl = 23000 - newTotal;
                                }
                                else if(newTotal < 35000)
                                {
                                    newlvl = 6;
                                    nxtlvl = 35000 - newTotal;
                                }
                                else if(newTotal < 51000)
                                {
                                    newlvl = 7;
                                    nxtlvl = 51000 - newTotal;
                                }
                                else if(newTotal < 75000)
                                {
                                    newlvl = 8;
                                    nxtlvl = 75000 - newTotal;
                                }
                                else if(newTotal < 105000)
                                {
                                    newlvl = 9;
                                    nxtlvl = 105000 - newTotal;
                                }
                                else if(newTotal < 155000)
                                {
                                    newlvl = 10;
                                    nxtlvl = 155000 - newTotal;
                                }
                                else if(newTotal < 220000)
                                {
                                    newlvl = 11;
                                    nxtlvl = 220000 - newTotal;
                                }
                                else if(newTotal < 315000)
                                {
                                    newlvl = 12;
                                    nxtlvl = 315000 - newTotal;
                                }
                                else if(newTotal < 445000)
                                {
                                    newlvl = 13;
                                    nxtlvl = 445000 - newTotal;
                                }
                                else if(newTotal < 635000)
                                {
                                    newlvl = 14;
                                    nxtlvl = 635000 - newTotal;
                                }
                                else if(newTotal < 890000)
                                {
                                    newlvl = 15;
                                    nxtlvl = 890000 - newTotal;
                                }
                                else if(newTotal < 1300000)
                                {
                                    newlvl = 16;
                                    nxtlvl = 1300000 - newTotal;
                                }
                                else if(newTotal < 1800000)
                                {
                                    newlvl = 17;
                                    nxtlvl = 1800000 - newTotal;
                                }
                                else if(newTotal < 2550000)
                                {
                                    newlvl = 18;
                                    nxtlvl = 2550000 - newTotal;
                                }
                                else if(newTotal < 3600000)
                                {
                                    newlvl = 19;
                                    nxtlvl = 3600000 - newTotal;
                                }
                                else if(newTotal >= 3600000)
                                {
                                    newlvl = 20;
                                    nxtlvl = 0;
                                }
                                return 0;

                            }
                            else
                            {
                                return 1;

                            }
                        }
                        else
                        {
                            return 2;
                        }
                    }).then(function(z){
                        if (z == 0)
                        {
                            connection.query("UPDATE accounts SET exp = '"+ newTotal+"' WHERE accountId = '" + accId+"'");
                            connection.query("UPDATE accounts SET nxtlvl = '"+ nxtlvl+"' WHERE accountId = '" + accId+"'");
                            connection.query("UPDATE accounts SET level = '"+ newlvl+"' WHERE accountId = '" + accId+"'");
                            chnl.send(message.author.username +" rewarded "+name+ " ID["+accId+"] "+amount+" exp.");
                            chnl.send(accId+" leveled up!");
                            connection.query("INSERT INTO log (name1, account1, action, name2, amount, date) VALUES ('"+name+"', '"+accId+"', 'rewarded experience' ,'" +message.author.username +"', '"+ amount+"', '"+new Date().toISOString().slice(0, 19).replace('T', ' ')+"')");
                            connection.query("INSERT INTO log (name1, account1, action, amount, date) VALUES ('"+name+"', '"+accId+"', 'Leveled up' ,'"+ newlvl+"', '"+new Date().toISOString().slice(0, 19).replace('T', ' ')+"')");
                        }
                        else if(z ==1)
                        {
                            connection.query("UPDATE accounts SET exp = '"+ newTotal+"' WHERE accountId = '" + accId+"'");
                            connection.query("UPDATE accounts SET nxtlvl = '"+ nxtlvl+"' WHERE accountId = '" + accId+"'");
                            chnl.send(message.author.username +" rewarded "+name+ " ID["+accId+"] "+amount+" exp.");
                            connection.query("INSERT INTO log (name1, account1, action, name2, amount, date) VALUES ('"+name+"', '"+accId+"', 'rewarded experience' ,'" +message.author.username +"', '"+ amount+"', '"+new Date().toISOString().slice(0, 19).replace('T', ' ')+"')");
                        }
                        else if(z == 2)
                        {

                        }
                    });   
            }
            else
            {
                message.reply("You do not have permission to use this command.");
            }
    }
}

module.exports = expPayment;