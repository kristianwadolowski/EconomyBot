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

    function createAccountId()
    {
        var loop = 1;
        while(loop>0)
        {
            //console.log("inside loop of createAccountId");
            var accountId = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
            for (var i = 0; i < 3; i++)
            {
                accountId += possible.charAt(Math.floor(Math.random() * possible.length))
            }
            //console.log("checking accountID: "+accountId);
            sql = 'SELECT * FROM accounts WHERE accountId = ?';
            var x=con.then(function(conn){
                //console.log("inside accountquery promise");
                var result;
                connection=conn;
                result=connection.query(sql,[accountId]);
                return result;
            }).then(function(result)
            {
                //console.log("inside second accountquery promise");
                if (result.length < 1)
                {
                    return accountId;
                }
                else
                {
                    return accountId=" ";
                }
            });
            if(accountId.length>0){
                loop=0;
            }
        }
        return x;
    }

class profileProfile extends commando.Command
{
    constructor(client)
    {
        super(client, {
            name: 'profile',
            group: 'profile',
            memberName: 'profile',
            description: 'shows the profile of the user, and their accounts. Creates a profile on the first use.'
        });
    }

        

    async run(message, args)
    {
            var usr = message.author.id;
            var account1;
            var account2;
            var sql = 'SELECT * FROM users WHERE UserId = ?';
            con.then(function(conn){
                connection = conn;
                return connection.query('SELECT * FROM users WHERE UserId = ' + usr);
            }).then(function(result){
                if(result < 1)
                {
                    createAccountId().then(function(accountId1){
                        account1 = accountId1;
                        var acc1 = "INSERT INTO accounts (UserId, accountId) VALUES ?";
                        var val1 = [
                        [usr, account1]
                        ];
                        connection.query(acc1, [val1]);
                    });
                    createAccountId().then(function(accountId2){
                        account2 = accountId2;
                        var acc2 = "INSERT INTO accounts (UserId, accountId) VALUES ?";
                        var val2 = [
                        [usr, account2]
                        ];
                        connection.query(acc2, [val2]);
                    }).then(function(){
                        var usr2 = "INSERT INTO users (UserId, accountId1, accountId2) VALUES ?";
                        var val3 = [
                        [usr, account1, account2]
                        ];
                        connection.query(usr2, [val3]);
                    }).then(function(){
                        connection.query("INSERT INTO log (name1, account1, action ,account2, date) VALUES ('"+message.author.username+"', '"+account1+"', 'New Profile' ,'"+account2+"', '"+new Date().toISOString().slice(0, 19).replace('T', ' ')+"')");
                        message.reply( "New profile created!");
                    })
                }
                else{
                    var acc1 = result[0].accountId1;
                    var acc2 = result[0].accountId2;
                    var name1;
                    var name2;
                    var lvl1;
                    var lvl2;
                    var exp1;
                    var exp2;
                    var tolvl1;
                    var tolvl2;
                    var cash1;
                    var cash2;
                    connection.query('SELECT * FROM accounts WHERE accountId = ?', acc1).then(function(results){
                        console.log(results); 
                        tolvl1 = results[0].nxtlvl;
                        name1 = results[0].accountName;
                        lvl1 = results[0].level;
                        exp1 = results[0].exp;
                        cash1 = results[0].accountBalance;
                    });
                    
                    connection.query('SELECT * FROM accounts WHERE accountId = ?', acc2).then(function(results){
                        console.log(results);
                        tolvl2 = results[0].nxtlvl;
                        name2 = results[0].accountName; 
                        lvl2 = results[0].level;
                        exp2 = results[0].exp;
                        cash2 = results[0].accountBalance;
                    })
                    .then(function(){
                        message.author.send("\n" +  name1 + " :" +
                        "\n Id: " + acc1 +
                        "\n gp:" + cash1 +
                        "\n lvl: " + lvl1 +
                        "\n exp: " + exp1 +  
                        "\n exp to next level: " + tolvl1 +
                        "\n" +  
                        "\n" +  name2 + " :" +
                        "\n Id: " + acc2 +
                        "\n gp" + cash2 +
                        "\n lvl: " + lvl2 +
                        "\n exp: " + exp2 +  
                        "\n exp to next level: " + tolvl2  );
                    })

                    console.log(result);    
                }
            })
    }
}

module.exports = profileProfile;