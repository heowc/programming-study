import org.junit.Before;
import org.junit.Test;

import static junit.framework.TestCase.assertEquals;

public class Question5 {

	private static final double X = 1.0;
	private static final double Y = 2.0;

	private static final double RADIUS = 1.0;
	private static final int WIDTH = 100;
	private static final int HEIGHT = 200;

	private Circle circle = null;
	private Rectangle rectangle = null;
	private Line line = null;

	@Before
	public void before_setup() {
		final Point POINT = new Point(X, Y);
		final Point TO_POINT = new Point(X + 1, Y + 1);

		circle = new Circle(POINT, RADIUS);
		rectangle = new Rectangle(POINT, WIDTH, HEIGHT);
		line = new Line(POINT, TO_POINT);
	}

	@Test
	public void test_clone() {
		Circle cloneCircle = circle.clone();
		assertEquals(circle.getCenter().equals(cloneCircle.getCenter()), true);

//		circle.moveBy(X, 0);
//		assertEquals(circle.getCenter().equals(cloneCircle.getCenter()), true);

		Rectangle cloneRectangle = rectangle.clone();
		assertEquals(rectangle.getCenter().equals(cloneRectangle.getCenter()), true);

		Line cloneLine = line.clone();
		assertEquals(line.getCenter().equals(cloneLine.getCenter()), true);
	}
}
