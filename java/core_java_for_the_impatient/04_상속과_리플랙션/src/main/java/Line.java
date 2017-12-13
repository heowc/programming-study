public class Line extends Shape {

	protected Point to;

	public Line(Point from, Point to) {
		this.point = from;
		this.to = to;
	}

	@Override
	public Point getCenter() {
		return point;
	}

	@Override
	public Line clone() {
		try {
			return (Line) super.clone();
		} catch (CloneNotSupportedException e) {
			return null;
		}
	}
}
