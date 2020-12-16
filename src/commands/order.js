const fs = require('fs');
let rawdata = fs.readFileSync('./json/config.json');
let config = JSON.parse(rawdata);
const prefix = config.prefix;
module.exports = {
	name: 'order',
	description: 'Sends the order to a log that the game master can see.',
	aliases: ['submit'],
	usage: '{current time} {order that you want to submit}\n**Example:** '+prefix+'order Fall-1901 Army Par -> Pic, Fleet Eng -> Iri, etc..\nplease send orders from your designated country channel.',
	execute(message, args, client) {
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
		    		user_sub = country_id[i].submission_id;
		    		user_is_power = true;
		    		break;
		    	}
		    }
		    if (!user_is_power){
		    	//user is not a power
		    	message.reply('you are not authorized to make this command.');
		    } else {
		    	//user is a power
		    	fs.readFile('./json/year.json', 'utf8', (err, jsonAString) => {
				    if (err) {
				        console.log("Error reading file from disk:", err)
				        return
				    }
				    const current_time = JSON.parse(jsonAString)
				    var string_order = ""
				    if (args[0] == current_time.current_time){
				    	//send the order'
				    	var message_time = args[0]
				   		message_time = message_time.split('_').join(' of ')
				    	var array_order = args;
				    	array_order.splice(0, 1);
				    	var string_order = array_order.join(' ');
				    	const channel = client.channels.cache.get(user_sub);
						channel.send("*** " + message_time + " ***\n" + string_order + "\n\n");
						message.author.send("For the " + message_time +
						"\nthe following order has been submitted:\n" + string_order);
						//set the submission to true.
						fs.readFile('./json/submission.json', 'utf8', (err, jsonBString) => {
					   		if (err) {
					        	console.log("Error reading file from disk:", err)
					        	return
					    	}
					    	const submission = JSON.parse(jsonBString)
					    	//traverse each element of the array until the array is at it's length
					    	var year_position
					    	for(j = 0; j < submission.length; j++){
					    		//console lof says comparing undefined with Fall_1901\
					    		if (submission[j].Time == current_time.current_time){
					    			switch (user_country){
					    				case "austria":
					    					submission[j].austria = true;
											break;
										case "england":
											submission[j].england = true;
											break;
										case "france":
											submission[j].france = true;
											break;
										case "germany":
											submission[j].germany = true;
											break;
										case "italy":
											submission[j].italy = true;
											break;
										case "russia":
											submission[j].russia = true;
											break;
										case "turkey":
											submission[j].turkey = true;
											break;
					    			}
					    			break;
					    		}
					    	}
					    	const jsonCString = JSON.stringify(submission)
							fs.writeFile('./json/submission.json', jsonCString, err => {
			    				if (err) {
			        				console.log('Error writing file', err)
			    				} 
							})
						})
				    } else {
				    	message.reply("The order must have the first argument as the current time."
				    	+ "\nan example would be: *** order Fall_1901 germany sends nudes ***" +
				    	"\nThe current time is : ***" + current_time.current_time + "***")
				    }
				})
				fs.readFile('./json/year.json', 'utf8', (err, jsonDString) => {
				 	if (err) {
				        console.log("Error reading file from disk:", err)
				        return
				    }
				    time = JSON.parse(jsonDString)
					fs.readFile('./json/submission.json', 'utf8', (err, jsonCString) => {
				 		if (err) {
				        	console.log("Error reading file from disk:", err)
				        	return
				    	}
				    	var all_submitted = false;
				    	const submission_check = JSON.parse(jsonCString)
				    	for(k = 0; k < submission_check.length; k++){
				    		if (submission_check[k].Time == time.current_time){
				    			if (submission_check[k].austria == "true" && 
				    				submission_check[k].england == "true" && 
				    				submission_check[k].france == "true" && 
				    				submission_check[k].germany == "true" && 
				    				submission_check[k].italy == "true" && 
					   				submission_check[k].russia == "true" && 
					   				submission_check[k].turkey == "true" ){
				    				all_submitted == true;
				    				console.log("All submitted, send a message to notifications")
				    				break;
						  		}
						  	}
						}
					 	if (all_submitted){
						    //message the admin.
						    fs.readFile('./json/config.json', 'utf8', (err, jsonDString) => {
								if (err) {
									console.log("Error reading file from disk:", err)
							        return
								} else {
								    const admin_id = JSON.parse(jsonDString)
								    const channel = client.channels.cache.get(admin_id.admin_channel);
									channel.send(" *** Attention *** \n<@&"+admin_id.admin_role+"> "+
									"All countries have submitted an order for" + current_time.current_time);	
								}    	
							})
						}
					})
				})
		    }
		})
	}
};



