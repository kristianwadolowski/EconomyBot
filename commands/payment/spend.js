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

class payPayment extends commando.Command
{
    constructor(client)
    {
        super(client, {
            name: 'spend',
            group: 'payment',
            memberName: 'spend',
            description: 'Spend money by purchasing things from NPCs: e!pay [your ID] [amount]'
        });
    }

        

    async run(message, args)
    {
        var usr;
        var split;
        var accId; //account1
        var amount; //amount
        var name1; //name1
        var newBal;

                var chnl =  message.guild.channels.find("name", "econ-bot-log");

                    con.then(function(conn){

                                connection = conn;
                                 usr = message.author.id;
                                 split = args.split(" ");
                                 accId = split[0];
                                 amount = split[1];
                                 amount = parseInt(amount, 10);
                            
                    }).then(function(){
                        return connection.query("SELECT * FROM accounts WHERE userId = " + usr+ " AND accountId = '"+ accId+"'");
                    }).then(function(result){
                        if(result < 1)
                        {
                            message.reply("You don't have an account with that ID");
                            return 0;
                        }
                        else
                        { 
                            if((result[0].accountBalance >= amount) && (amount > 0)){
                                newBal = result[0].accountBalance - amount;
                                name1 = result[0].accountName;
                                return 1;
                            //var sql = "UPDATE accounts SET accountName = '"+ newName+"' WHERE accountId = '" + accId+"'";
                            //connection.query(sql);
                           // message.reply("The name for account "+ accId+" has been changed to "+newName);
                            }
                            else if (amount <= 0)
                            {
                                message.reply("You can't just get more money like that.");
                                return 0;
                            }
                            else
                            {
                                message.reply("You don't have that much money in your account!");
                                return 0;
                            }
                        }
                    }).then(function(x){
                        if(x == 1)
                        {
                            connection.query("UPDATE accounts SET accountbalance = '"+ newBal+"' WHERE accountId = '" + accId+"'");
                            chnl.send(name1+" ID["+accId+"] spent "+amount+" gp.");
                            connection.query("INSERT INTO log (name1, account1, action, amount, date) VALUES ('"+name1+"', '"+accId+"', 'Spent' ,'"+ amount+"', '"+new Date().toISOString().slice(0, 19).replace('T', ' ')+"')");
                        }

                    });
    }
}

module.exports = payPayment;