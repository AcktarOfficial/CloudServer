exports.run = (client, message) => {
	const node = require('nodeactyl');
	const Application = node.Application;
	const Discord = require('discord.js');
	const randomWords = require('random-words');
	let ram = {};
	let disk = {};
	let software = {};
	const randname = (randomWords({ exactly: 3, join: '' }));

	const con = require('../utils/dbConnector');


	Application.login(client.config.panelURL, client.config.panelAPI, (logged_in, err) => {
		if(!err) console.log('[CloudServer] Logged In To The Panel');
	});

	const userid = message.author.id;

	con.query(`SELECT * FROM users WHERE discord_id = '${userid}'`, function(err, result) {
		const NoCon = new Discord.MessageEmbed()
			.setColor('FF0009')
			.setAuthor('CloudServer ¦ Creation', client.user.avatarURL())
			.setDescription('```There was an error connecting to the database. Please report this issue to a member of the staffteam```')
			.setFooter(`💕CloudServer Alpha| CodeCannibals\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL());

		if (err) return message.channel.send(NoCon);

		if (result.length == 1) {
			const user = JSON.parse(JSON.stringify(result[0]));
			con.query(`SELECT * FROM levels WHERE level = '${user.level}'`, function(err, results) {
				const level = JSON.parse(JSON.stringify(results[0]));

				const totsrvs = (user.extra_servers + level.servers_balance);
				const totram = (user.extra_ram + level.ram_balance);
				const totdisk = (user.extra_disk + level.disk_balance);

				if (user.current_servers >= totsrvs) {
					const MaxReached = new Discord.MessageEmbed()
						.setColor('#FFD500')
						.setAuthor('CloudServer ¦ Creation', client.user.avatarURL())
						.setDescription('```You have already reached your maximum servers limit. Please upgrade to a donator plan for more resources```')
						.setFooter(`💕CloudServer Alpha | CodeCannibals\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL());
					return message.channel.send(MaxReached);
				}

				const UserStats = new Discord.MessageEmbed()
					.setColor('#FF00BD')
					.setAuthor('CloudServer ¦ Creation', client.user.avatarURL())
					.setDescription('**__Your Current Statistics Is:__**' + '```' + `User Plan: ${level.plan}\nTotal Servers: ${user.current_servers}/${totsrvs}\nTotal Ram: ${user.current_ram}/${user.totram}\nTotal Disk: ${user.current_disk}/${user.totdisk}` + '```')
					.setFooter(`💕CloudServer Alpha | CodeCannibals\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL());
				message.channel.send(UserStats);

				const NumRam = new Discord.MessageEmbed()
					.setColor('#00FFA8')
					.setAuthor('CloudServer ¦ Creation', client.user.avatarURL())
					.setDescription('```1️⃣¦ How much Ram do you want to allocate to the server (MB)```')
					.setFooter(`💕CloudServer Alpha | CodeCannibals\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL());
				message.channel.send(NumRam).then(async function() {

					message.channel.awaitMessages(m => m.author.id == message.author.id,
						{ max: 1, time: 30000 }).then(async collected => {
						ram = collected.first().content;
					}).then(async function() {

						const NumDisk = new Discord.MessageEmbed()
							.setColor('#FF8100')
							.setAuthor('CloudServer ¦ Creation', client.user.avatarURL())
							.setDescription('```2️⃣¦ How much Disk space do you want to allocate to the server (MB)```')
							.setFooter(`💕CloudServer Alpha| CodeCannibals\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL());
						message.channel.send(NumDisk).then(async function() {

							message.channel.awaitMessages(m => m.author.id == message.author.id,
								{ max: 1, time: 30000 }).then(async collected => {
								disk = collected.first().content;
							}).then(async function() {

								const ServerSelector = new Discord.MessageEmbed()
									.setColor('#0084FF')
									.setAuthor('CloudServer ¦ Creation', client.user.avatarURL())
									.setDescription('**__Please Choose A Server Software To Install__**```1) Paper Spigot\n2) NukkitX\n3) Pocketmine-MP\n4) Bedrock Dedicated Server```**__Reply With A Number To Continue__**')
									.setFooter(`💕CloudServer Alpha| CodeCannibals\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL());
								message.channel.send(ServerSelector).then(async function() {

									message.channel.awaitMessages(m => m.author.id == message.author.id,
										{ max: 1, time: 30000 }).then(async collected => {
										software = collected.first().content;
									}).then(async function() {

										const ramleft = (totram - user.current_ram);
										const NoRamLeft = new Discord.MessageEmbed()
											.setColor('FF0009')
											.setAuthor('CloudServer ¦ Creation', client.user.avatarURL())
											.setDescription('```You don\'t have enough Ram in your balance to make this server```')
											.setFooter(`💕CloudServer Alpha | CodeCannibals\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL());
										if(ram > ramleft) return message.channel.send(NoRamLeft);

										const InvalidRam = new Discord.MessageEmbed()
											.setColor('FF0009')
											.setAuthor('CloudServer ¦ Creation', client.user.avatarURL())
											.setDescription('```To avoid abuse, The Minimum Ram allocation per server is set to 512MB```')
											.setFooter(`💕CloudServer Alpha | CodeCannibals\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL());
										if(ram < 512) return message.channel.send(InvalidRam);

										const diskleft = (totdisk - user.current_disk);
										const NoDiskLeft = new Discord.MessageEmbed()
											.setColor('FF0009')
											.setAuthor('CloudServer ¦ Creation', client.user.avatarURL())
											.setDescription('```You don\'t have enough Disk Space in your balance to make this server```')
											.setFooter(`💕CloudServer Alpha | CodeCannibals\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL());
										if(disk > diskleft) return message.channel.send(NoDiskLeft);

										const InvalidDisk = new Discord.MessageEmbed()
											.setColor('FF0009')
											.setAuthor('CloudServer ¦ Creation', client.user.avatarURL())
											.setDescription('```To avoid abuse, The Minimum Disk allocation per server is set to 512MB```')
											.setFooter(`💕CloudServer Alpha | CodeCannibals\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL());
										if(disk < 512) return message.channel.send(InvalidDisk);

										const Servers = (user.current_servers + 1);
										const RamCount = (Number(user.current_ram) + Number(ram));
										const DiskCount = (Number(user.current_disk) + Number(disk));

										if (software === '1') {
											Application.createServer('1.12.2', randname, user.pterodactyl_userID, null, client.config.paperEGG, 'quay.io/pterodactyl/core:java', 'java -Xms128M -Xmx{{SERVER_MEMORY}}M -Dterminal.jline=false -Dterminal.ansi=true -jar {{SERVER_JARFILE}}', ram, '0', disk, '500', '100', '0', '1').then(res => {
												con.query(`UPDATE users SET current_ram = '${RamCount}', current_disk = '${DiskCount}', current_servers = '${Servers}' WHERE discord_id = '${message.author.id}'`);
												con.query(`INSERT INTO servers (discord_id, pterodactyl_serverID, pterodactyl_userID, server_identifier, server_ram, server_disk) VALUES  ('${message.author.id}', '${res.id}', '${user.pterodactyl_userID}', '${res.identifier}', '${ram}', '${disk}')`);
												const Deployed = new Discord.MessageEmbed()
													.setColor('#CB00FF')
													.setAuthor('CloudServer ¦ Creation', client.user.avatarURL())
													.setDescription('```Your Server Has Been Deployed```')
													.setFooter(`💕CloudServer Alpha| CodeCannibals\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL());
												message.channel.send(Deployed);
											});
										}
										else if (software === '2') {
											Application.createServer('latest', randname, user.pterodactyl_userID, null, client.config.nukkitEGG, 'quay.io/pterodactyl/core:java-glibc', 'java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar {{SERVER_JARFILE}}', ram, '0', disk, '500', '100', '0', '1').then(res => {
												con.query(`UPDATE users SET current_ram = '${RamCount}', current_disk = '${DiskCount}', current_servers = '${Servers}' WHERE discord_id = '${message.author.id}'`);
												con.query(`INSERT INTO servers (discord_id, pterodactyl_serverID, pterodactyl_userID, server_identifier, server_ram, server_disk) VALUES  ('${message.author.id}', '${res.id}', '${user.pterodactyl_userID}', '${res.identifier}', '${ram}', '${disk}')`);
												const Deployed = new Discord.MessageEmbed()
													.setColor('#EC00FF')
													.setAuthor('CloudServer ¦ Creation', client.user.avatarURL())
													.setDescription('```Your Server Has Been Deployed```')
													.setFooter(`💕CloudServer Alpha | CodeCannibals\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL());
												message.channel.send(Deployed);
											});
										}
										else if (software === '3') {
											Application.createServer('latest', randname, user.pterodactyl_userID, null, client.config.pocketmineEGG, 'quay.io/parkervcp/pterodactyl-images:base_ubuntu', './bin/php7/bin/php ./PocketMine-MP.phar --no-wizard --disable-ansi', ram, '0', disk, '500', '100', '0', '1').then(res => {
												con.query(`UPDATE users SET current_ram = '${RamCount}', current_disk = '${DiskCount}', current_servers = '${Servers}' WHERE discord_id = '${message.author.id}'`);
												con.query(`INSERT INTO servers (discord_id, pterodactyl_serverID, pterodactyl_userID, server_identifier, server_ram, server_disk) VALUES  ('${message.author.id}', '${res.id}', '${user.pterodactyl_userID}', '${res.identifier}', '${ram}', '${disk}')`);
												const Deployed = new Discord.MessageEmbed()
													.setColor('#FF00B3')
													.setAuthor('CloudServer ¦ Creation', client.user.avatarURL())
													.setDescription('```Your Server Has Been Deployed```')
													.setFooter(`💕CloudServer Alpha| CodeCannibals\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL());
												message.channel.send(Deployed);
											});
										}
										else if (software === '4') {
											Application.createServer('latest', randname, user.pterodactyl_userID, null, client.config.bedrockEGG, 'quay.io/parkervcp/pterodactyl-images:base_ubuntu', './bedrock_server', ram, '0', disk, '500', '100', '0', '1').then(res => {
												con.query(`UPDATE users SET current_ram = '${RamCount}', current_disk = '${DiskCount}', current_servers = '${Servers}' WHERE discord_id = '${message.author.id}'`);
												con.query(`INSERT INTO servers (discord_id, pterodactyl_serverID, pterodactyl_userID, server_identifier, server_ram, server_disk) VALUES  ('${message.author.id}', '${res.id}', '${user.pterodactyl_userID}', '${res.identifier}', '${ram}', '${disk}')`);
												const Deployed = new Discord.MessageEmbed()
													.setColor('#B100FF')
													.setAuthor('CloudServer¦ Creation', client.user.avatarURL())
													.setDescription('```Your Server Has Been Deployed```')
													.setFooter(`💕CloudServer Alpha| CodeCannibals\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL());
												message.channel.send(Deployed);
											});
										}
										else {
											const Deployed = new Discord.MessageEmbed()
												.setColor('FF0009')
												.setAuthor('CloudServer ¦ Creation', client.user.avatarURL())
												.setDescription('```Your selected server software was not found```')
												.setFooter(`💕CloudServer Alpha| CodeCannibals\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL());
											message.channel.send(Deployed);
										}

									});
								});
							});
						});
					});
				});
			});
		}
		else {
			const Glitched = new Discord.MessageEmbed()
				.setColor('FF0009')
				.setAuthor('CloudServer¦ Creation', message.guild.iconURL())
				.setDescription('```You are not registered on our systems. You can do so by doing ' + client.config.prefix + 'register```')
				.setFooter(`💕CloudServer Alpha | CodeCannibals\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL());
			message.channel.send(Glitched);
		}
	});
};
