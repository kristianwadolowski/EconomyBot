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
  
class setNameProfile extends commando.Command
{
    constructor(client)
    {
        super(client, {
            name: 'setname',
            group: 'profile',
            memberName: 'setname',
            description: 'set the name of an account: e!setname [account ID] [New Name]'
        });
    }

        

    async run(message, args)
    {

            //message.reply( args);
        var usr;
        var split;
        var accId;
        var newName;
                    con.then(function(conn){

                                connection = conn;
                                 usr = message.author.id;
                                 split = args.split(" ");
                                 accId = split[0];
                                 newName = split[1];
                            
                    }).then(function(){
                        return connection.query("SELECT * FROM accounts WHERE userId = " + usr+ " AND accountId = '"+ accId+"'");
                    }).then(function(result){
                        if(result < 1)
                        {
                            message.reply("You don't have an account with that ID");
                        }
                        else
                        { 
                            if(newName.length < 61){
                            var sql = "UPDATE accounts SET accountName = '"+ newName+"' WHERE accountId = '" + accId+"'";
                            connection.query(sql);
                            message.reply("The name for account "+ accId+" has been changed to "+newName);
                            }
                            else
                            {
                                message.reply("Your name is too damn long!");
                            }
                        }
                    });   
    }
}

module.exports = setNameProfile;