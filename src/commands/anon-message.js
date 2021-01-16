const fs = require('fs');
let rawdata = fs.readFileSync('./json/config.json');
let config = JSON.parse(rawdata);
const prefix = config.prefix;
module.exports = {
	name: 'anon-message',
	description: 'Sends an anonymous message to the country of the user\'s choosing',
	aliases: ['message-anon','message_anon','anon_message'],
	usage: '{country receiving message} {message}\n**Example:** '+prefix+'anon-message france if you support england this round, germany and austria will make an alliance.',
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
		    		//user is a power that is sending an anon_message to them selves
		    		message.reply('you may not send an anonymous message to yourself');
		    	} else if ((args[0] == 'austria' || args[0] == 'england' || args[0] == 'france' || 
		    			   args[0] == 'germany' || args[0] == 'italy' || args[0] == 'russia' || 
		    			   args[0] == 'turkey') && args[0] != user_country){
		    		//send an anonymous message to 
			    	for (i = 0; i < country_id.length; i++){
			    		if (country_id[i].country == args[0]){
			    			var anon_message_channel = country_id[i].channel_id;
			    			var anon_message_role = country_id[i].role_id;
			    			break;
			    		}
			    	}
			    	var anon_message = "<@&"+anon_message_role+"> ***Message from an anonymous country***\n";
			    	var anon_message_arr = args.slice(1, args.length);
			    	for (i = 0; i < anon_message_arr.length; i++){
			    		anon_message = anon_message.concat(anon_message_arr[i]);
			    		anon_message = anon_message.concat(" ");
			    	}
					const channel = client.channels.cache.get(anon_message_channel);
					channel.send(anon_message);
					message.author.send("Your message has been sent to " + args[0]);
		    	} else {
		    		message.reply('your command must include a valid country as the first argument'
		    		+ '\nie. anon-message England attack at dawn');
		    	}
		    }
		})
	}
};
