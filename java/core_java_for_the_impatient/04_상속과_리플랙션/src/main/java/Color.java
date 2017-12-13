public enum Color {

	BLACK {
		@Override
		public Color getRed() {
			return null;
		}

		@Override
		public Color getGreen() {
			return null;
		}

		@Override
		public Color getBlue() {
			return null;
		}
	}
	, RED {
		@Override
		public Color getRed() {
			return Color.RED;
		}

		@Override
		public Color getGreen() {
			return null;
		}

		@Override
		public Color getBlue() {
			return null;
		}
	}
	, BLUE {
		@Override
		public Color getRed() {
			return null;
		}

		@Override
		public Color getGreen() {
			return null;
		}

		@Override
		public Color getBlue() {
			return Color.BLUE;
		}
	}
	, GREEN {
		@Override
		public Color getRed() {
			return null;
		}

		@Override
		public Color getGreen() {
			return Color.GREEN;
		}

		@Override
		public Color getBlue() {
			return null;
		}
	}
	, CYAN {
		@Override
		public Color getRed() {
			return null;
		}

		@Override
		public Color getGreen() {
			return Color.GREEN;
		}

		@Override
		public Color getBlue() {
			return Color.BLUE;
		}
	}
	, MAGENTA {
		@Override
		public Color getRed() {
			return Color.RED;
		}

		@Override
		public Color getGreen() {
			return Color.GREEN;
		}

		@Override
		public Color getBlue() {
			return null;
		}
	}
	, YELLOW {
		@Override
		public Color getRed() {
			return Color.RED;
		}

		@Override
		public Color getGreen() {
			return null;
		}

		@Override
		public Color getBlue() {
			return Color.BLUE;
		}
	}
	, WHITE {
		@Override
		public Color getRed() {
			return Color.RED;
		}

		@Override
		public Color getGreen() {
			return Color.GREEN;
		}

		@Override
		public Color getBlue() {
			return Color.BLUE;
		}
	};

	public abstract Color getRed();

	public abstract Color getGreen();

	public abstract Color getBlue();
}
