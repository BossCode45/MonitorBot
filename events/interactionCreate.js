const client = require("../index");

client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.reply({ content: "An error has occured!", ephemeral: true });

        if(!cmd.ephemeral)
            await interaction.deferReply({ ephemeral: false }).catch(() => {});
        else
            await interaction.deferReply({ ephemeral: cmd.ephemeral }).catch(() => {});
        
        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction, args);
    }

	if (interaction.isButton())
	{
		var strings = interaction.customId.split("-");
		var cmdName = "";
		for(var i = 0; i < strings.length-1; i++)
		{
			cmdName += strings[i] + "-";
		}
		cmdName = cmdName.substr(0, cmdName.length-1);
        const cmd = client.slashCommands.get(cmdName);
        
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        cmd.buttonClicked(client, interaction, interaction.customId.substr(cmdName.length+1));
	}

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        const command = client.slashCommands.get(interaction.commandName);

		if(!cmd.ephemeral)
            await interaction.deferReply({ ephemeral: false }).catch(() => {});
        else
            await interaction.deferReply({ ephemeral: cmd.ephemeral }).catch(() => {});

        if (command) command.run(client, interaction);
    }
});
