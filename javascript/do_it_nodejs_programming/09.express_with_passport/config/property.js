
module.exports = {
	port: 3000,
	datasource: {
		url: 'mongodb://localhost/local',
		option: {
			useMongoClient: true
		}
	},
	mongodb: {
		schemas: [
			{
				file: './schema/userSchema',
				collection: 'user',
				schemaName: 'UserSchema',
				modelName: 'UserModel'
			}
		]
	},
	routes: [
		// { file: './user', path: '/user', method: 'add', type: 'post' },
		// { file: './user', path: '/user/:id', method: 'find', type: 'get' }
	]
};