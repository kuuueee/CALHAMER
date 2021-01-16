const fs = require('fs');
let rawdata = fs.readFileSync('./json/config.json');
let config = JSON.parse(rawdata);
const prefix = config.prefix;
module.exports = {
	name: 'beak',
	description: 'Sends an anonymous message to the trash-talk channel',
	aliases: ['trash-talk','insult','shit-talk'],
	usage: 'beak',
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
		    if (!user_is_power){
		    	//user is not a power
		    	message.reply('you are not authorized to make this command.');
		    } else {
		    	//user is a power and can send a message to the trash talk channel
                var anon_message = "~";
			    var anon_message_arr = args.slice(0, args.length);
			    var anon_message_channel = "793910340156653579";
			   	for (i = 0; i < anon_message_arr.length; i++){
		    		anon_message = anon_message.concat(anon_message_arr[i]);
		    		anon_message = anon_message.concat(" ");
		    	}
		    	anon_message = anon_message.slice(1, anon_message.length);
				const channel = client.channels.cache.get(anon_message_channel);
				channel.send(anon_message);
		    }
		})
	}
};