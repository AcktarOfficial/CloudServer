exports.run = (client, message) => {
	const Discord = require('discord.js');
	const con = require('../utils/dbConnector');


	const userid = message.author.id;
	con.query(`SELECT * FROM users WHERE discord_id = '${userid}'`, (err, result) => {

		const noCon = new Discord.MessageEmbed()
			.setAuthor('CloudServer ¦ Credentials', client.user.avatarURL())
			.setColor('FF0009')
			.setFooter(`💕CloudServer Alpha | CodeCannibals\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
			.setDescription('```There was an error connecting to the database. Please report this issue to a member of the staffteam```');

		if (err) return message.channel.send(noCon);

		if (result.length == 0) {
			const noReg = new Discord.MessageEmbed()
				.setAuthor('CloudServer ¦ Credentials', client.user.avatarURL())
				.setColor('FF0009')
				.setFooter(`💕CloudServer Alpha | CodeCannibals\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
				.setDescription('```You are not a registered user. Please register yourself with ' + client.config.prefix + 'register to unlock this command```');
			message.channel.send(noReg);
		}
		else {
			const Database = JSON.parse(JSON.stringify(result[0]));
			const sent = new Discord.MessageEmbed()
				.setAuthor('CloudServer ¦ Credentials', client.user.avatarURL())
				.setColor('DE4BFF')
				.setFooter(`💕CloudServer Alpha | CodeCannibals\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
				.setDescription('```Your credentials has been sent to you```');
			message.channel.send(sent);

			const embed = new Discord.MessageEmbed()
				.setAuthor('CloudServer ¦ Credentials', client.user.avatarURL())
				.setColor('DE4BFF')
				.setFooter(`💕CloudServer Alpha | CodeCannibals\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
				.setDescription('**__User Credentials For CloudServer__**```Email: ' + Database.email + '\nUsername: ' + Database.pterodactyl_username + '\nPassword: ' + Database.pterodactyl_password + '```');
			message.author.send(embed);
		}
	});
};
