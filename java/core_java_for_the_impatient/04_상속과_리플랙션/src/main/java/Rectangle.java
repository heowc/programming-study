public class Rectangle extends Shape {

	protected double width;
	protected double height;

	public Rectangle(Point topLeft, double width, double height) {
		this.point = topLeft;
		this.width = width;
		this.height = height;
	}

	@Override
	public Point getCenter() {
		return point;
	}

	@Override
	public Rectangle clone() {
		try {
			return (Rectangle) super.clone();
		} catch (CloneNotSupportedException e) {
			return null;
		}
	}
}
