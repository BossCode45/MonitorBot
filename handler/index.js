const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");

const globPromise = promisify(glob);

module.exports = async (client) => {
	//Events
	const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
	eventFiles.map((value) => require(value));

	//Slash Commands
	const slashCommands = await globPromise(`${process.cwd()}/slashCommands/*/*.js`);
	const arrayOfSlashCommands = [];
	slashCommands.map((value) => {
		const file = require(value);
		if(!file?.name) return;
		client.slashCommands.set(file.name, file);

		if(["MESSAGE", "USER"].includes(file.type)) delete file.description;

		arrayOfSlashCommands.push(file);
	});

	client.on("ready", async () => {

		if(client.config.prod === "true")
			await client.application.commands.set(arrayOfSlashCommands);

		else
			await client.guilds.cache.get(client.config.testServer).commands.set(arrayOfSlashCommands);
	});
}
