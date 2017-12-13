public class Circle extends Shape {

	protected double radius;

	public Circle(Point center, double radius) {
		this.point = center;
		this.radius = radius;
	}

	@Override
	public Point getCenter() {
		return this.point;
	}

	@Override
	public Circle clone() {
		try {
			Circle circle = (Circle) super.clone();
//			circle.point = point.clone(); // deep clone
			return circle;
		} catch (CloneNotSupportedException e) {
			return null;
		}
	}
}
