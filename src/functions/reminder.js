exports.remind_users = function(client){
	//check to see the current time.
	const fs = require('fs')
	fs.readFile('./json/year.json', 'utf8', (err, jsonString) => {
	    if (err) {
	        console.log("Error reading file from disk:", err)
	        return
	    }
	    const date_parse = JSON.parse(jsonString)
	    date = date_parse.current_time.toString();
    	//check to see which users have not submitted in the current time
    	fs.readFile('./json/submission.json', 'utf8', (err, jsonString) => {
		    if (err) {
		        console.log("Error reading file from disk:", err)
		        return
		    }
		    // loop through submission array
		    var submission_arr_place = 0;
		    const submission_arr = JSON.parse(jsonString);
		    for (i =0; i < submission_arr.length; i++){
		    	if (date == submission_arr[i].Time){
		    		submission_arr_place = i;
		    	}
		    }
		    var countries_required = [];
		    if (submission_arr[submission_arr_place].austria == false){
		    	countries_required.push("austria")
		    }
		    if (submission_arr[submission_arr_place].england == false){
		    	countries_required.push("england")
		    }
		    if (submission_arr[submission_arr_place].france == false){
		    	countries_required.push("france")
		    }
		    if (submission_arr[submission_arr_place].germany == false){
		    	countries_required.push("germany")
		    }
		    if (submission_arr[submission_arr_place].italy == false){
		    	countries_required.push("italy")
		    }
		    if (submission_arr[submission_arr_place].russia == false){
		    	countries_required.push("russia")
		    }
		    if (submission_arr[submission_arr_place].turkey == false){
		    	countries_required.push("turkey")
		    }
		    if (submission_arr.length != 0) {
		    	//go through entire countries_required and send a message to each of the countries
		    	const fs = require('fs')
				fs.readFile('./json/country_id.json', 'utf8', (err, jsonString) => {
				    if (err) {
				        console.log("Error reading file from disk:", err)
				        return
				    }
				    const country_id = JSON.parse(jsonString)
				    //loop through array of countries that didn't submit and for each
				    //find the corresponding channel to send a message to.
				    for (i = 0; i < countries_required.length; i++){
		    			var temp_country = countries_required[i];

		    			//list_of_non_submissions.concat(temp_country);	
		    			//list_of_non_submissions.concat("\n");

		    			//keep the message in temp and loop though the country.json file to match
		    			//country to the place the submission needs to be sent
		    			for (j = 0; j < country_id.length; j++){
		    				if (country_id[j].country == temp_country){
		    					//send a message to that country
		    					var temp_channel = country_id[j].channel_id;
		    					var temp_role = country_id[j].role_id;
		    					var temp_message = ("Hello <@&" + temp_role + 
		    					"> please submit your order for " + date);
		    					const channel = client.channels.cache.get(temp_channel);
								channel.send(temp_message);	 
		    					break;
		    				}
		    			}
		    		}
					var list_of_non_submissions = ""
		    		for (i = 0; i < countries_required.length; i++){
		    			var temp_country = countries_required[i];
		    			list_of_non_submissions = list_of_non_submissions.concat(temp_country);	
		    			list_of_non_submissions = list_of_non_submissions.concat("\n");
		    		}
		    		fs.readFile('./json/config.json', 'utf8', (err, jsonString) => {
					    if (err) {
					        console.log("Error reading file from disk:", err)
					        return
					    }
					    const config = JSON.parse(jsonString)
					    admin_channel = config.admin_channel
					    const channel = client.channels.cache.get("706647594918477864");
					    var admin_role = config.admin_role
						channel.send("<@&"+admin_role + ">, Here is a list of all countries that need to"
						+" submit\n" +list_of_non_submissions);	 
					})
				})
		    } else {
		    	// there was an error
		    	console.log("error in reminder.js")
                return;
		    }
		})
	})
}