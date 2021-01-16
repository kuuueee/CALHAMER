const fs = require('fs');
let rawdata = fs.readFileSync('./json/config.json');
let config = JSON.parse(rawdata);
const prefix = config.prefix;
module.exports = {
	name: 'country-message',
	description: 'Sends message to the country of the users choosing notifying which country sent the message',
	aliases: ['message-country', 'message_country','country_message'],
	usage: '{country receiving message} {message}\n**Example:** '+prefix+'country-message france we will support your move into brussels if you give us passage through belgium',
	execute(message, args, client) {
		//if the message came from a dm, exit out of the command without warning.
		if (message.channel.type === 'dm') {
			return;
		}
		const fs = require('fs')
		fs.readFile('./json/country_id.json', 'utf8', (err, jsonString) => {
		    if (err) {
		        console.log("Error reading file from disk:", err)
		        return
		    }
		    const country_id = JSON.parse(jsonString)
		    user_is_power = false;
		    for (i = 0; i < country_id.length; i++){
		    	if (message.member.roles.cache.has(country_id[i].role_id)){
		    		user_country = country_id[i].country;
		    		user_is_power = true;
		    		break;
		    	}
		    }
		    args[0] = args[0].toLowerCase();
		    if (!user_is_power){
		    	//user is not a power
		    	message.reply('you are not authorized to make this command.');
		    } else {
		    	//user is a power
		    	if (args[0] == user_country){
		    		//user is a power that is sending an country_message to them selves
		    		message.reply('you may not send a message to yourself');
		    	} else if ((args[0] == 'austria' || args[0] == 'england' || args[0] == 'france' || 
		    			   args[0] == 'germany' || args[0] == 'italy' || args[0] == 'russia' || 
		    			   args[0] == 'turkey') && args[0] != user_country){
		    		//send a message to 
			    	for (i = 0; i < country_id.length; i++){
			    		if (country_id[i].country == args[0]){
			    			var anon_message_channel = country_id[i].channel_id;
			    			var anon_message_role = country_id[i].role_id;
			    			break;
			    		}
			    	}
			    	var country_message = "<@&"+anon_message_role+"> ***Message from " + user_country + "***\n";
			    	var anon_message_arr = args.slice(1, args.length);
			    	for (i = 0; i < anon_message_arr.length; i++){
			    		country_message = country_message.concat(anon_message_arr[i]);
			    		country_message = country_message.concat(" ");
			    	}
					const channel = client.channels.cache.get(anon_message_channel);
					channel.send(country_message);
					message.author.send("Your message has been sent to " + args[0]);
		    	} else {
		    		message.reply('your command must include a valid country as the second argument'
		    		+ '\nie. country-message England attack at dawn');
		    	}
		    }
		})
	}
};
