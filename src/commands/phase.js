const fs = require('fs');
let rawdata = fs.readFileSync('./json/config.json');
let config = JSON.parse(rawdata);
const prefix = config.prefix;
module.exports = {
	name: 'phase',
	description: '**------Admin Command------**\nAllows the game master to advance to the next season, or reset to the first season',
	//aliases: ['commands'],
	usage: ' season to advance submissions one season\n'+prefix+'phase reset to reset the current season to Fall_1901',
	execute(message, args, client) {
		const fs = require('fs')
		fs.readFile('./json/config.json', 'utf8', (err, jsonString) => {
		    if (err) {
		        console.log("Error reading file from disk:", err)
		        return
		    }
		    const admin_id = JSON.parse(jsonString)
		    user_is_admin = false;
		    if (message.member.roles.cache.has(admin_id.admin_role)){
		    	user_is_admin = true;
		    }
			if (!user_is_admin){
			   	message.reply('you are not authorized to make this command.');
			} else {
			    //user has admin role
			    if (args[0] == "season" || args[0] == "reset"){
				    fs.readFile('./json/year.json', 'utf8', (err, jsonAString) => {
				    	if (err) {
				       		console.log("Error reading file from disk:", err)
				        	return
				   		}
				   		const phase = JSON.parse(jsonAString)
				   		if (args[0] == "season"){
				   			//length -1 so that the array does not fall out of scope.
					   		for (i = 0; i < phase.seasons.length-1; i++){
				   				if (phase.current_time == phase.seasons[i]){
				   					phase.current_time = phase.seasons[i+1];
				   					break;
								}
					   		}
					   	} else if (args[0] == "reset"){
					   		phase.current_time = phase.seasons[0];
					   	}
					   	//write to the json file with the current time
					   	const jsonBString = JSON.stringify(phase)
						fs.writeFile('./json/year.json', jsonBString, err => {
		    				if (err) {
		        				console.log('Error writing file', err)
		    				} else {
		        				//send message to the world powers that the season has changed.
		        				const channel = client.channels.cache.get("704788597185839218");
								channel.send(" *** Attention *** \n<@&778778968719360030> "+
								", The current season is now " + phase.current_time);
		   					}
						})
					})
				} else {
				  	//admin did not make a valid command.
				   	message.reply("You must commit to a valid argument, the following are accepted" +
				   				   "\n ***season***, ***reset***")
				}
			}
		})
	},
};