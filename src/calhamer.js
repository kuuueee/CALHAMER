const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./json/config.json');
const cron = require('cron');
var reminder = require("./functions/reminder.js");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity(prefix+'help', { type: 'LISTENING' });
});


client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	try {
		command.execute(message, args, client);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute command!');
	}

});

//right now check to see if there is a submission every monday and wednesday at 11pm PST based on server in EST



let scheduledReminder = new cron.CronJob('0 22 * * 1,3', () => {
	reminder.remind_users(client); 
});

scheduledReminder.start()



client.login(token);
