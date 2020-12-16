const fs = require('fs');
let rawdata = fs.readFileSync('./json/config.json');
let config = JSON.parse(rawdata);
const prefix = config.prefix;
module.exports = {
	name: 'reset-submission',
	description: '**------Admin Command------**\nResets the submission status of all countries for the current year',
	//aliases: ['commands'],
	usage: ' ',
	execute(message, args, client) {
		//only allow admins to use this command
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
				fs.readFile('./json/submission.json', 'utf8', (err, jsonString) => {
					if (err) {
						console.log("Error reading file from disk:", err)
						return
					}
					const submission = JSON.parse(jsonString)
					for(j = 0; j < submission.length; j++){
						submission[j].austria = false;
						submission[j].england = false;
						submission[j].france = false;
						submission[j].germany = false;
						submission[j].italy = false;
						submission[j].russia = false;
						submission[j].turkey = false;
					}
					const jsonAString = JSON.stringify(submission)
					fs.writeFile('./json/submission.json', jsonAString, err => {
					    if (err) {
					        console.log('Error writing file', err)
					    } else {
					    	message.reply("You have reset all submission status' to false")
					    }
					})
				})
			}
		})
	},
};