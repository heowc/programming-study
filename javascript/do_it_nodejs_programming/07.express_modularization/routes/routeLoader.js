
// RouteLoader 클래스 정의
class RouteLoader {

	init(app, router, property) {
		this.app = app;
		this.router = router;
		this.property = property;

		this.load();
	}

	// route에 매핑
	load() {
		this.property.routes.forEach(routeProperty => {
			let routeModule = require(routeProperty.file);

			this.addRoute(routeModule, routeProperty);
		});

		this.app.use('/', this.router);
	}

	// type에 따른 route 함수 추가
	addRoute(routeModule, routeProperty) {
		if (routeProperty.type === 'get') {
			this.router.route(routeProperty.path).get(routeModule[routeProperty.method]);
		}

		if (routeProperty.type === 'post') {
			this.router.route(routeProperty.path).post(routeModule[routeProperty.method]);
		}

		if (routeProperty.type === 'delete') {
			this.router.route(routeProperty.path).delete(routeModule[routeProperty.method]);
		}

		if (routeProperty.type === 'put') {
			this.router.route(routeProperty.path).put(routeModule[routeProperty.method]);
		}
	}
}

module.exports = new RouteLoader();