public abstract class Shape implements Cloneable {

	protected Point point;

	public void moveBy(double dx, double dy) {
		point.x += dx;
		point.y += dy;
	}

	public abstract Point getCenter();
}
