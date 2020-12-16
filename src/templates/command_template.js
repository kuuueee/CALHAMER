module.exports = {
	name: '',  //This is the user input parameter ie. {perfix}ping = !ping , response pong
	description: '', //Allows for a dynamic description of the command
	execute(message, args) {
		//code
		message.channel.send('Pong.');
	},
};