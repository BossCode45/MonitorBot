/*
 
  example

const {Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const {connectSQL, runQuery} = require("../../sql/sqlHandler.js");

module.exports = {
	name: "get-item",
	description: "Get details of an item",
	type: "CHAT_INPUT",
	options: [{
		name: "item-id",
		description: "The ID of the item you want to fetch",
		type: "NUMBER",
		required: true
	}],
	ephemeral: false,

	run: async (client, interaction, args) => {
		const res = await runQuery(`SELECT * FROM stock WHERE ID = ${args[0]}`);
		const data = res.rows[0];

		const embed = new MessageEmbed()
			.setColor("#1F1FFF")
			.setTitle(`${data.ID} - ${data.Name}`)
			.addFields(
				{name: "Quantity", value: `${data.Quantity}`, inline: true},
				{name: "Location", value: `${data.Location}`, inline: true},
				{name: '\u200B', value: '\u200B', inline: true}, //NEW LINE
				{name: "Model (if applicable)", value: `${((data?.Model) ? data.Model : "None given")}`, inline: true},
				{name: "Serial number (if applicable)", value: `${((data?.Serial_number) ? data.Serial_number : "None given")}`, inline: true}
			);

		try
		{
			interaction.followUp({embeds: [embed]});
		}
		catch (e)
		{
			console.log(e);
			interaction.followUp({content: "\nERROR\nContact dev at: `19115@tgs.school.nz`"});
		}
	}
}

*/
