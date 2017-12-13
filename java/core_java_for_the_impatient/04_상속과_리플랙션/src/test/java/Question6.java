import org.junit.Before;
import org.junit.Test;

import static junit.framework.TestCase.assertEquals;

public class Question6 {

	private Item item;
	private DiscountedItem discountedItem;
	private DiscountedItem discountedItem2;

	private static final String DESCRIPTION = "새우깡";
	private static final double PRICE = 1000;
	private static final double DISCOUNT = 10;

	@Before
	public void before_setup() {
		item = new Item(DESCRIPTION, PRICE);
		discountedItem = new DiscountedItem(DESCRIPTION, PRICE, DISCOUNT);
		discountedItem2 = new DiscountedItem(DESCRIPTION, PRICE, DISCOUNT - 1);
	}

	@Test
	public void test_equals() {
		assertEquals(discountedItem.equals(item), true); // x.equals(y) == true
		assertEquals(item.equals(discountedItem2), true); // y.equals(z) == true
		assertEquals(discountedItem.equals(discountedItem2), false); // x.equals(z) == false
	}
}
