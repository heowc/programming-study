import java.util.Objects;

public class LabeledPoint extends Point {

	private String label;

	public LabeledPoint(String label, double x, double y) {
		super(x, y);
		this.label = label;
	}

	public String getLabel() {
		return this.label;
	}

	@Override
	public int hashCode() {
		return Objects.hash(this.label, super.hashCode());
	}

	@Override
	public boolean equals(Object obj) {
		if (!super.equals(obj)) {
			return false;
		}

		LabeledPoint labeledPoint = (LabeledPoint) obj;
		return this.label.equals(labeledPoint.getLabel());
	}

	@Override
	public String toString() {
		return "LabeledPoint ["
				+ "x = " + this.x
				+ ", y = " + this.y
				+ ", label = " + this.label
				+ "]";
	}
}