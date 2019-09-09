const commando = require('discord.js-commando');
const Discord = require('discord.js');
var mysql = require('promise-mysql');

var dataBase = new Discord.Collection();
//var start = 1529055326;
var cycle = 28800000;
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
            name: 'time',
            group: 'time',
            memberName: 'time',
            description: 'Testing time tracking'
        });
    }
 

    async run(message, args)
    {
       var chnl =  message.guild.channels.find("name", "time");
       //var chnl =  message.guild.channels.find("name", "econo-bot-log");
       //chnl.send("Hello!");
       var totalDays = Date.now()/cycle;
       var timeRemaining = Date.now()%(cycle*7); //
       var hoursRemaining = (timeRemaining/3600000)|0;
       var minutesRemaining = (((timeRemaining/60000)-(hoursRemaining*60))|0);
       hoursRemaining = 56- hoursRemaining;
       var years = (totalDays/365)|0;
       var months;
       var days = (totalDays%365)|0;
       var weekDay = (totalDays%7)|0;
       var dayName;
       var monthDay;
       var monthName;
       var daySuffix = "th";
       //var time = Date.now()/cycle;
       if((days >=0) && (days<=31))
       {
            months = 1;
            monthDay = days;
            monthName = "Juerkauf";
       }
       else if((days >=31) && (days<=62))
       {
            months = 2;
            monthDay = days- 31;
            monthName = "Aht";
       }
       else if((days >=62) && (days<=93))
       {
            months = 3;
            monthDay = days- 62;
            monthName = "Miwasp";
       }
       else if((days >=93) && (days<=124))
       {
            months = 4;
            monthDay = days- 93;
            monthName = "Sobo";
       }
       else if((days >=124) && (days<=155))
       {
            months = 5;
            monthDay = days- 124;
            monthName = "Afud";
       }
       else if((days >=155) && (days<=185))
       {
            months = 6;
            monthDay = days- 155;
            monthName = "Narumn";
       }
       else if((days >=185) && (days<=215))
       {
            months = 7;
            monthDay = days- 185;
            monthName = "Fahiq";
       }
       else if((days >=215) && (days<=245))
       {
            months = 8;
            monthDay = days- 215;
            monthName = "Decluse";
       }
       else if((days >=245) && (days<=275))
       {
            months = 9;
            monthDay = days- 245;
            monthName = "Kruunch";
       }
       else if((days >=275) && (days<=305))
       {
            months = 10;
            monthDay = days- 275;
            monthName = "Fween";
       }
       else if((days >=305) && (days<=335))
       {
            months = 11;
            monthDay = days- 305;
            monthName = "Treech";
       }
       else if((days >=335) && (days<=3365))
       {
            months = 12;
            monthDay = days- 355;
            monthName = "Ruede";
       }

       if((monthDay == 1) ||(monthDay == 21)||(monthDay ==31))
       {
        daySuffix = "st"
       }
       else if((monthDay == 2) ||(monthDay == 22))
       {
        daySuffix = "nd"
       }
       else if((monthDay == 3) ||(monthDay == 23))
       {
        daySuffix = "rd"
       }
       switch(weekDay) {
        case 0:
            dayName ="Sonsday";
            break;
        case 1:
            dayName ="Garfday";
            break;
        case 2:
            dayName ="Threasday";
            break;
        case 3:
            dayName ="Camsday";
            break;
        case 4:
            dayName ="Humpday";
            break;
        case 5:
            dayName ="Friday";
            break;
        case 6:
            dayName ="Reggie";
            break;
    }

       //chnl.send("Year: "+ years + " Month: " + months+ " Weekday: "+ weekDay+" Days: "+ days);
       chnl.send(dayName + ", " +monthName + " " + monthDay + daySuffix + ", " + years + " AB (" +monthDay+"/"+months+"/"+years+")");
       chnl.send("Time(irl) until next Sonsday: " + hoursRemaining +":"+minutesRemaining)
    }

}

module.exports = logLog;