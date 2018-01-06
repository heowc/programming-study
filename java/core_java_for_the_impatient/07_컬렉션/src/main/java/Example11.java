import java.util.LinkedHashMap;
import java.util.Map;

public class Example11 {

    public static void main(String[] args) {
    }

    public class Cache<K, V> extends LinkedHashMap<K, V> {

        final int maxSize;

        Cache(int maxSize) {
            super(maxSize);
            this.maxSize = maxSize;
        }

        @Override
        protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
            if (maxSize > size()) {
                return false;
            }

            return super.removeEldestEntry(eldest);
        }
    }
}
