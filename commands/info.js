exports.run = async (client, message, args) => {
const mysql = require("mysql");
const Discord = require("discord.js");

const con = mysql.createConnection({
    connectionLimit: 20,
    host: client.config.mysqlHOST,
    port: "3306",
    user: client.config.mysqlUSER,
    password: client.config.mysqlPASS,
    database: client.config.mysqlDB
})

var userid = message.author.id;
con.query(`SELECT * FROM users WHERE discord_id = '${userid}'`, function(err, result, fields) {

let NoCon = new Discord.MessageEmbed()
    .setColor("FF0009")
    .setAuthor("CloudServer ¦ Info", client.user.avatarURL()) 
    .setDescription("```There was an error connecting to the database. Please report this issue to a member of the staffteam```")
    .setFooter(`💕CloudServer Alpha| CodeCannibals\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
if (err) return message.channel.send(NoCon);

if (result.length == 1){
var user = JSON.parse(JSON.stringify(result[0]));
con.query(`SELECT * FROM levels WHERE level = '${user.level}'`, function(err, results, fields) {
var level = JSON.parse(JSON.stringify(results[0]));

let totsrvs = (user.extra_servers + level.servers_balance);
let totram = (user.extra_ram + level.ram_balance);
let totdisk = (user.extra_disk + level.disk_balance);
  
let embed = new Discord.MessageEmbed()
    .setAuthor("CloudServer ¦ Info", client.user.avatarURL())
    .setFooter(`💕CloudServer Alpha | CodeCannibals\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
    .setDescription(`**__Viewing Informations Of (${message.author.tag})__**`+"```"+`Panel Username: ${user.pterodactyl_username}\nUser Plan: ${level.plan}\nTotal Servers: ${user.current_servers}/${totsrvs}\nTotal Ram: ${user.current_ram}/${totram}\nTotal Disk: ${user.current_disk}/${totdisk}`+"```")
    .setColor("#D500FF")
message.channel.send(embed);
})
} else {
let NoReg = new Discord.MessageEmbed()
    .setColor("#99FF00")
    .setAuthor("CloudServer ¦ Info", client.user.avatarURL()) 
    .setDescription("```There was an error trying to fetch the user data```")
    .setFooter(`💕CloudServer Alpha | CodeCannibals\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
 message.channel.send(NoReg);
}
})
}
