const {Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const os = require("os");
const osUtils = require("os-utils");

module.exports = {
	name: "performance",
	description: "Get details of server performance",
	type: "CHAT_INPUT",
	ephemeral: false,

	run: async (client, interaction, args) => {
		
		osUtils.cpuUsage(function(usage) {
			const CPU = Math.round((usage*100+Number.EPSILON)*100)/100;

			const usedRam = Math.round((((os.totalmem()-os.freemem())/1073741824)+Number.EPSILON)*100)/100;
			const totalRam = Math.round(((os.totalmem()/1073741824)+Number.EPSILON)*100)/100;

			const days = Math.floor(os.uptime()/86400);
			const hours = Math.floor((os.uptime()-days*86400)/3600);
			const minutes = Math.floor((os.uptime()-days*86400-hours*3600)/60);

			interaction.followUp({content:  `CPU: ${CPU}%\nRAM: ${usedRam}GB/${totalRam}GB\nUPTIME: ${days}d ${hours}h ${minutes}m`});
		});

	}
}
