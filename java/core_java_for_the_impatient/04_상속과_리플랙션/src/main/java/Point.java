import java.util.Objects;

public class Point /*implements Cloneable*/ {

	protected double x;
	protected double y;

	public Point(double x, double y) {
		this.x = x;
		this.y = y;
	}

	public double getX() {
		return this.x;
	}

	public double getY() {
		return this.y;
	}

	@Override
	public int hashCode() {
		return Objects.hash(this.x, this.y);
	}

	@Override
	public boolean equals(Object obj) {
		if (Objects.isNull(obj)) {
			return false;
		}

		if (getClass() != obj.getClass()) {
			return false;
		}

		Point point = (Point) obj;
		return this.x == point.getX() && this.y == point.getY();
	}

	@Override
	public String toString() {
		return "Point ["
				+ "x = " + this.x
				+ ", y = " + this.y
				+ "]";
	}

//	@Override
//	public Point clone() throws CloneNotSupportedException {
//		return (Point) super.clone();
//	}
}