import org.junit.Test;

import static junit.framework.TestCase.assertEquals;

public class Question2 {

	private static final double X = 1.0;
	private static final double Y = 2.0;
	private static final String LABEL = "label";

	@Test
	public void test_toString() {
		Point point = new Point(X, Y);
		LabeledPoint labeledPoint = new LabeledPoint(LABEL, X, Y);
		assertEquals(point.toString(), "Point [x = 1.0, y = 2.0]");
		assertEquals(labeledPoint.toString(), "LabeledPoint [x = 1.0, y = 2.0, label = label]");
	}

	@Test
	public void test_equals() {
		Point point = new Point(X, Y);
		LabeledPoint labeledPoint = new LabeledPoint(LABEL, X, Y);

		Point matchedPoint = new Point(X, Y);
		assertEquals(point.equals(matchedPoint), true);

		Point notMatchedPoint = new Point(X, Y + 1);
		assertEquals(point.equals(notMatchedPoint), false);

		LabeledPoint matchedLabeledPoint = new LabeledPoint("label", X, Y);
		assertEquals(labeledPoint.equals(matchedLabeledPoint), true);

		LabeledPoint notMatchedLabeledPoint = new LabeledPoint("not match", X, Y);
		assertEquals(labeledPoint.equals(notMatchedLabeledPoint), false);

		LabeledPoint notMatchedLabeledPoint2 = new LabeledPoint("label", X, Y + 1);
		assertEquals(labeledPoint.equals(notMatchedLabeledPoint2), false);

		assertEquals(point.equals(labeledPoint), false);
		assertEquals(point.equals(notMatchedLabeledPoint), false);
		assertEquals(point.equals(notMatchedLabeledPoint2), false);

		assertEquals(labeledPoint.equals(point), false);
	}
}
