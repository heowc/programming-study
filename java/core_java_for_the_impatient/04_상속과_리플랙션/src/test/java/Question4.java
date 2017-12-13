import org.junit.Before;
import org.junit.Test;

import static junit.framework.TestCase.assertEquals;

public class Question4 {

	private static final double X = 1.0;
	private static final double Y = 2.0;

	private Point point = null;

	@Before
	public void before_setup() {
		point = new Point(X, Y);
	}

	@Test
	public void test_Circle() {
		Circle circle = new Circle(point, 1.0);

		assertEquals(circle.getCenter().equals(point), true);
		assertEquals(circle.getCenter().equals(new Point(X + 1, Y)), false);

		circle.moveBy(X, 0);
		assertEquals(circle.getCenter().equals(new Point(X + X, Y)), true);
	}

	@Test
	public void test_Rectangle() {
		Rectangle rectangle = new Rectangle(point, 100, 200);

		assertEquals(rectangle.getCenter().equals(point), true);
		assertEquals(rectangle.getCenter().equals(new Point(X + 1, Y)), false);

		rectangle.moveBy(X, 0);
		assertEquals(rectangle.getCenter().equals(new Point(X + X, Y)), true);
	}

	@Test
	public void test_Line() {
		Point toPoint = new Point(X + X, Y + Y);
		Line line= new Line(point, toPoint);

		assertEquals(line.getCenter().equals(point), true);
		assertEquals(line.getCenter().equals(new Point(X + 1, Y)), false);

		line.moveBy(X, 0);
		assertEquals(line.getCenter().equals(new Point(X + X, Y)), true);
	}
}
