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
            name: 'pay',
            group: 'payment',
            memberName: 'pay',
            description: 'Pay another player from your account: e!pay [your ID] [amount] [recipient\'s ID]'
        });
    }

        

    async run(message, args)
    {
        var usr;
        var split;
        var accId; //account1
        var amount; //amount
        var acc2Id; //account2
        var name1; //name1
        var name2; //name2
        var newBal1;
        var newBal2;
        var chnl =  message.guild.channels.find("name", "econ-bot-log");

                    con.then(function(conn){

                                connection = conn;
                                 usr = message.author.id;
                                 split = args.split(" ");
                                 accId = split[0];
                                 amount = split[1];
                                 acc2Id = split[2];
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
                                newBal1 = result[0].accountBalance - amount;
                                name1 = result[0].accountName;
                                return 1;
                            //var sql = "UPDATE accounts SET accountName = '"+ newName+"' WHERE accountId = '" + accId+"'";
                            //connection.query(sql);
                           // message.reply("The name for account "+ accId+" has been changed to "+newName);
                            }
                            else if (amount <= 0)
                            {
                                message.reply("That's called stealing, and it's wrong.");
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
                            return connection.query("SELECT * FROM accounts WHERE accountId = '"+ acc2Id+"'");
                        }
                        else
                        {
                            return 2;
                        }
                    }).then(function(result){
                        if(result < 1)
                        {
                            message.reply("There is no account with that ID");
                            return 0;
                        }
                        else if(result == 2)
                        {
                            return 0;
                        }
                        else
                        {   newBal2 = result[0].accountBalance + amount;
                            name2 = result[0].accountName;
                            return 1;
                        }
                    }).then(function(y){
                        if(y == 1)
                        {
                            connection.query("UPDATE accounts SET accountbalance = '"+ newBal2+"' WHERE accountId = '" + acc2Id+"'");
                            connection.query("UPDATE accounts SET accountbalance = '"+ newBal1+"' WHERE accountId = '" + accId+"'");
                            chnl.send(name1 +"ID["+accId +"] paid "+name2 +"ID["+acc2Id+"] "+amount+" gp.");
                            connection.query("INSERT INTO log (name1, account1, action, name2, account2, amount, date) VALUES ('"+name1+"', '"+accId+"', 'Paid' ,'" +name2 +"','"+acc2Id+"','"+ amount+"', '"+new Date().toISOString().slice(0, 19).replace('T', ' ')+"')");
                        }
                    });   
    }
}

module.exports = payPayment;