exports.run = async (client, message) => {
	const Discord = require('discord.js');
	const con = require('../utils/dbConnector');

	const userid = message.author.id;
	con.query(`SELECT * FROM users WHERE discord_id = '${userid}'`, function(err, result) {

		const NoCon = new Discord.MessageEmbed()
			.setColor('FF0009')
			.setAuthor('CloudServer ¦ Info', client.user.avatarURL())
			.setDescription('```There was an error connecting to the database. Please report this issue to a member of the staffteam```')
			.setFooter(`💕CloudServer Alpha| CodeCannibals\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL());
		if (err) return message.channel.send(NoCon);

		if (result.length === 1) {
			const user = JSON.parse(JSON.stringify(result[0]));
			con.query(`SELECT * FROM levels WHERE level = '${user.level}'`, (err, results) => {
				const level = JSON.parse(JSON.stringify(results[0]));

				const totsrvs = (user.extra_servers + level.servers_balance);
				const totram = (user.extra_ram + level.ram_balance);
				const totdisk = (user.extra_disk + level.disk_balance);

				const embed = new Discord.MessageEmbed()
					.setAuthor('CloudServer ¦ Info', client.user.avatarURL())
					.setFooter(`💕CloudServer Alpha | CodeCannibals\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
					.setDescription(`**__Viewing Informations Of (${message.author.tag})__**` + '```' + `Panel Username: ${user.pterodactyl_username}\nUser Plan: ${level.plan}\nTotal Servers: ${user.current_servers}/${totsrvs}\nTotal Ram: ${user.current_ram}/${totram}\nTotal Disk: ${user.current_disk}/${totdisk}` + '```')
					.setColor('#D500FF');
				message.channel.send(embed);
			});
		}
		else {
			const NoReg = new Discord.MessageEmbed()
				.setColor('#99FF00')
				.setAuthor('CloudServer ¦ Info', client.user.avatarURL())
				.setDescription('```There was an error trying to fetch the user data```')
				.setFooter(`💕CloudServer Alpha | CodeCannibals\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL());
			message.channel.send(NoReg);
		}
	});
};
