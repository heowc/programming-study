
class User {

	add(req, res) {
		let user = req.body;
		let Model = req.app.get('schemas').UserModel;
		let userModel = new Model(user);

		userModel.save((err, result) => {
			if (err) {
				res.status(500).send({ message: 'fail' });
			} else {
				res.send(result);
			}
		});
	}

	find(req, res) {
		let id = req.params.id;
		let Model = req.app.get('schemas').UserModel;

		Model.find({ id: id }, (err, results) => {
			if (err) {
				res.status(500).send({ message: 'fail' });
			} else {
				res.send(results);
			}
		});
	}
}


module.exports = new User();
