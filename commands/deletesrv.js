exports.run = (client, message) => {
  const Discord = require("discord.js");
  const con = require("../utils/dbConnector");
  const node = require("nodeactyl");
  const Application = node.Application;
  let SID = {};

  Application.login(client.config.panelURL, client.config.panelAPI, (logged_in, err) => {
       if (!err) console.log("[CloudServer] Logged In To The Panel");
     });

  let Notify = new Discord.MessageEmbed()
    .setColor("#1D58CB")
    .setAuthor("CloudServer ¦ Management", client.user.avatarURL())
    .setDescription("```By continuing this step, all your server files will be permanently erased from our systems. We take no responsibility for any file lost as you willingly entered this command```")
    .setFooter(`💕CloudServer Alpha| CodeCannibals\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
  message.channel.send(Notify);

  let IdSrv = new Discord.MessageEmbed()
    .setColor("#FFFC00")
    .setAuthor("CloudServer ¦ Management", client.user.avatarURL())
    .setDescription("```1️⃣¦ What is the id of the server you want to delete (can be found on your panel)```")
    .setFooter(`💕CloudServer Alpha | CodeCannibals\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
  message.channel.send(IdSrv).then(async function() {
  	
         message.channel.awaitMessages(m => m.author.id == message.author.id, {
              max: 1,
              time: 30000
          }).then(async collected => {
               SID = collected.first().content;
          }).then(async function() {
          	
               var userid = message.author.id;
                  con.query(`SELECT * FROM servers WHERE discord_id = '${userid}' AND server_identifier = '${SID}'`, function(err, result) {
                  
                      let NotFound = new Discord.MessageEmbed()
                          .setColor("FF0009")
                          .setAuthor("CloudServer ¦ Management", client.user.avatarURL())
                          .setDescription("```The server identifier you entered was not found```")
                          .setFooter(`💕CloudServer Alpha| CodeCannibals\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())

                            if (err) return message.channel.send(NotFound);

                            if (result.length == 1) {
                                   var Server = JSON.parse(JSON.stringify(result[0]));
                                         Application.deleteServer(Server.pterodactyl_serverID).then(res => {
                                         	
                                         let SRVDEL = new Discord.MessageEmbed()
                                             .setColor("#FA00FF")
                                             .setAuthor("CloudServer ¦ Management", client.user.avatarURL())
                                             .setDescription("```Your server has been deleted successfully```")
                                             .setFooter(`💕CloudServer Alpha | CodeCannibals\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())

                                         con.query(`SELECT * FROM users WHERE discord_id = '${userid}'`, function(error, results) {
                                              var user = JSON.parse(JSON.stringify(results[0]));
                      
                      let newservers = user.current_servers - 1;
                      let newram = Number(user.current_ram) - Number(Server.server_ram);
                      let newdisk = Number(user.current_disk) - Number(Server.server_disk);

                      con.query(`UPDATE users SET current_ram = '${newram}', current_disk = '${newdisk}', current_servers = '${newservers}' WHERE discord_id = '${message.author.id}'`);
                      con.query(`DELETE FROM servers WHERE server_identifier = '${SID}'`);
                      message.channel.send(SRVDEL);
                    }
                  );
                })
                .catch(e => {
                  console.log(e);
                       let ERRDEL = new Discord.MessageEmbed()
                           .setColor("FF0009")
                           .setAuthor("CloudServer ¦ Management", client.user.avatarURL())
                           .setDescription("```An error occured while deleting your server, Please try again later```")
                           .setFooter(`💕CloudServer Alpha | CodeCannibals\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
                       message.channel.send(ERRDEL);
                });
            } else {
              let ERRDEL = new Discord.MessageEmbed()
                .setColor("FF0009")
                .setAuthor("CloudServer ¦ Management", client.user.avatarURL())
                .setDescription("```You dont have permission to delete this server```")
                .setFooter(`💕CloudServer Alpha | CodeCannibals\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
              message.channel.send(ERRDEL);
            }
          }
        );
      });
  });
};
