const fs = require('fs');
let rawdata = fs.readFileSync('./json/config.json');
let config = JSON.parse(rawdata);
const prefix = config.prefix;
module.exports = {
	name: 'date',
	description: 'returns the current date to the user',
	aliases: ['time','current-time'],
	usage: ' ',
	execute(message, args, client) {
		const fs = require('fs')
		fs.readFile('./json/year.json', 'utf8', (err, jsonString) => {
		    if (err) {
		        console.log("Error reading file from disk:", err)
		        return
		    }
		    const date = JSON.parse(jsonString)
		    date_raw = date.current_time;
		    date_string = date_raw.split('-').join(' of ')
		    message.reply("The current date is " + date_string + "\nWhen making an order please" +
		    " use the exact formating : **"+ date_raw + "**");
		})
	}
};
