module.exports = {
	production: {
		mongoURI: 'mongodb://node-story-teller-user:node123456@ds251877.mlab.com:51877/node-story-teller',
		google: {
			clientID:'876123203372-au7o3cdj9r5vlhfqdo6qva6mh0pfche0.apps.googleusercontent.com',
			clientSecret: 'A9bub_fJqA8rnNT77Fj09DLZ',
			callbackURL: 'https://node-story-teller.herokuapp.com/auth/google/callback',
			callbackURLDev: 'http://localhost:3030/auth/google/callback',
		}
	},
	development: {
		mongoURI: 'mongodb://node-story-teller-user:node123456@ds251877.mlab.com:51877/node-story-teller',
		google: {
			clientID:'876123203372-au7o3cdj9r5vlhfqdo6qva6mh0pfche0.apps.googleusercontent.com',
			clientSecret: 'A9bub_fJqA8rnNT77Fj09DLZ',
			callbackURL: 'http://localhost:3030/auth/google/callback',
		}
	}
}
