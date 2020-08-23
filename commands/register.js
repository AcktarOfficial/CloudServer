exports.run = (client, message, args) => {
  const node = require('nodeactyl');
  const Application = node.Application;
  const mysql = require('mysql');
  const Discord = require("discord.js");
  const randomWords = require('random-words');
  let email = {};
  let password = {};
  
  const con = mysql.createConnection({
    connectionLimit: 20,
    host: client.config.mysqlHOST,
    port: "3306",
    user: client.config.mysqlUSER,
    password: client.config.mysqlPASS,
    database: client.config.mysqlDB,
});
  
var userid = message.author.id;
con.query(`SELECT * FROM users WHERE discord_id = '${userid}'`, function (err, result, fields) {
let NoCon = new Discord.MessageEmbed()
    .setColor("FF0009")
    .setAuthor("CloudServer ¦ Registration", client.user.avatarURL()) 
    .setDescription("```There was an error connecting to the database. Please report this issue to a member of the staffteam```")
    .setFooter(`💕CloudServer Alpha | AcktarOfficial.com\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
       
if (err) return message.channel.send(NoCon);
  
if (result.length == 0) {
let embed = new Discord.MessageEmbed()
  .setColor("56FF5B")
  .setFooter(`💕CloudServer Alpha | AcktarOfficial.com\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
  .setAuthor("CloudServer ¦ Registration", client.user.avatarURL())
  .setDescription("```Due to privacy reasons, the registration will take place in your DMS. Please ensure than you are allowed to received DMS from this server```")
message.channel.send(embed);
  
let embed1 = new Discord.MessageEmbed()
    .setColor("3768FF")
    .setFooter(`💕CloudServer Alpha | AcktarOfficial.com\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
    .setAuthor("CloudServer ¦ Registration", client.user.avatarURL())
    .setDescription("**__What Is CloudServer__**```CloudServer is an easy to modify Advanced discord bot which aims to help small hosts or other peoples get a better control of their servers```**__Bug Fixes ¦¦ Contributions__**```CloudServer is a project which is part of the OpenSource Collaboration Community and welcomes contributors to improve / fix bugs and send their pr for review```**__Support Links__**\n**[Youtube](https://m.youtube.com/channel/UChjN4G3gnyn8F7FUo-WRQpA)**\n**[Github](https://github.com/AcktarOfficial)**\n**[Support Server](https://discord.gg/WQvGtXk)**")
message.author.send(embed1).then(m =>{
let c = m.channel;
  
let embed2 = new Discord.MessageEmbed()
    .setColor("#FFDC00")
    .setFooter(`💕CloudServer Alpha | AcktarOfficial.com\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
    .setDescription("```1️⃣| What Is your email```")
c.send(embed2).then(async function() {
  
c.awaitMessages(m => m.author.id == message.author.id,
    {max: 1, time: 300000}).then(async collected => {
    email = (collected.first().content);
}).then(async function() {
  
let embed = new Discord.MessageEmbed()
    .setColor("#FFE900")
    .setDescription("```2️⃣| What Do You Want Your Panel Password To Be```")
    .setFooter(`💕CloudServer Alpha | AcktarOfficial.com\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
c.send(embed).then(async function() {
  
c.awaitMessages(m => m.author.id == message.author.id,
     {max: 1, time: 300000}).then(async collected =>{
     password = (collected.first().content);
              
Application.login(client.config.panelURL, client.config.panelAPI, (logged_in, err) => {
     console.log("[CloudServer] Logged In To Panel Succesfully");
})
  
let randname = (randomWords({ exactly: 2, join: '' }));
Application.createUser(randname, password, email, randname, "@CloudServer", false, "en").then(pan => {
let embed = new Discord.MessageEmbed()
     .setAuthor("CloudServer ¦ Registration", client.user.avatarURL())
     .setFooter(`💕CloudServer Alpha | AcktarOfficial.com\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
     .setDescription("```You have been successfully registered on our systems. You can see your balance with "+client.config.prefix+"info and create servers with "+client.config.prefix+"deploy```")
     .setColor("56FF5B")
c.send(embed);
  
con.query(`INSERT INTO users (discord_id, email, level, pterodactyl_userid, pterodactyl_password, pterodactyl_username, extra_disk, extra_ram, extra_servers, current_ram, current_disk, current_servers) VALUES ('${message.author.id}', '${email}', '1', '${pan.id}', '${password}', '${randname}', '0', '0', '0', '0', '0', '0')`);
}).catch(err => {
let embed = new Discord.MessageEmbed()
     .setAuthor("CloudServer ¦ Registration", client.user.avatarURL())
     .setFooter(`💕CloudServer Alpha | AcktarOfficial.com\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
     .setDescription("```There was an error creating your account. Most probably the email address that you used is already registered on our systems. If this is your email and you didnt register it, Please contact a member of the staffteam```")
     .setColor("FF0009")
c.send(embed);
})
   })
      })
          })
       })
    }) 
} else {
let embed = new Discord.MessageEmbed()
    .setAuthor("CloudServer ¦ Registration", client.user.avatarURL())
    .setFooter(`💕CloudServer Alpha | AcktarOfficial.con\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
    .setColor("FF0009")
    .setDescription("```You cannot create multiple accounts on the panel. If you lost your password, do "+client.config.prefix+"credentials to obtain them```") 
message.channel.send(embed);
     } 
  }) 
} 
