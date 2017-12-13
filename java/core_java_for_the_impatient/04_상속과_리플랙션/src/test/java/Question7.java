import org.junit.Test;

import static junit.framework.TestCase.assertEquals;

public class Question7 {

	@Test
	public void test_getRed() {
		assertEquals(Color.RED.equals(Color.RED.getRed()), true);
		assertEquals(Color.BLUE.equals(Color.BLUE.getBlue()), true);
		assertEquals(Color.GREEN.equals(Color.GREEN.getGreen()), true);
		assertEquals(Color.RED.equals(Color.BLACK.getRed()), false);
		assertEquals(Color.BLUE.equals(Color.CYAN.getBlue()), true);
		assertEquals(Color.GREEN.equals(Color.MAGENTA.getGreen()), true);
		assertEquals(Color.RED.equals(Color.YELLOW.getRed()), true);
		assertEquals(Color.BLUE.equals(Color.WHITE.getBlue()), true);
	}
}
