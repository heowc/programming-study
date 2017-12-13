import java.util.Objects;

public class DiscountedItem extends Item {
	private double discount;

	public DiscountedItem(String description, double price, double discount) {
		super(description, price);
		this.discount = discount;
	}

	public boolean equals(Object otherObject) {
		if (!super.equals(otherObject)) {
			return false;
		}

		if (getClass() != otherObject.getClass()) {
			return true;
		}

		DiscountedItem discountedItem = (DiscountedItem) otherObject;
		return this.discount == discountedItem.discount;
	}

	public int hashCode() {
		return Objects.hash(super.hashCode(), discount);
	}
}