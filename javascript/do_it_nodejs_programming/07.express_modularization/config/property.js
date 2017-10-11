
module.exports = {
	port: 3000,
	// 데이터베이스 정보
	datasource: {
		url: 'mongodb://localhost/local',
		option: {
			useMongoClient: true
		}
	},
	// 몽고디비 정보
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
	// 라우터 정보
	routes: [
		{ file: './user', path: '/user', method: 'add', type: 'post' },
		{ file: './user', path: '/user/:id', method: 'find', type: 'get' }
	]
};