# MonitorBot
A discord bot to monitor a server.

## Table of contents
+ [Installation](#installation)
	+ [Pre Requisites](#pre-requisites)
+ [config.json format](#configjson)
+ [Removal](#removal)
+ [Usage](#usage)
+ [Edititng the bot](#editing-the-bot)

## Installation
+ ### Pre Requisites
	+ Node js version 16.6.0 or greater
	+ A discord bot setup in the [developer portal](https://discord.com/developers/applications)
+ Clone the project `git clone https://github.com/BossCode45/MonitorBot.git`
+ Navigate into the directory `cd MonitorBot`
+ Add a new file called 'config.json' ([format](#configjson))
+ Run the bot ([Usage](#usage))

## config.json
This is a json file containing information the application needs about the bot
```
{
	"token": "{bot token}",
	"prod": "{true or false depending on if you intend the commands to be on all servers}",
	"testServer": "{the server you want the commands on if prod is false}"
}
```

## Removal
+ Delete the folder with monitor bot in it

## Usage
+ Run `npm start` or `node index.js`

## Editing the bot
To add a new command add '{name}.js' into a folder within `slashCommands` (e.g. `slashCommands/temps/getTemp.js`)

For the format either refer to another commands file or use the format provided on the discord API (the only different part is the ephemeral value which relates to if everyone is allowed to see the output or just the user of the command)
