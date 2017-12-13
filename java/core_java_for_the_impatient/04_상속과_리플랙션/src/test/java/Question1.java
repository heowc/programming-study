import org.junit.Test;

import static junit.framework.TestCase.assertEquals;

public class Question1 {

	private static final double X = 1.0;
	private static final double Y = 2.0;
	private static final String LABEL = "label";

	@Test
	public void test_point() {
		Point point = new Point(X, Y);
		assertEquals(point.getX(), X);
		assertEquals(point.getY(), Y);
	}

	@Test
	public void test_labeledPoint() {
		LabeledPoint labeledPoint = new LabeledPoint(LABEL, X, Y);
		assertEquals(labeledPoint.getLabel(), LABEL);
	}
}
