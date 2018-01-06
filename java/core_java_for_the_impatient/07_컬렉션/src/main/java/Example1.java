import java.util.BitSet;
import java.util.HashSet;
import java.util.Set;

public class Example1 {

    public static void main(String[] args) {
        final int LIMIT = 20;

        getPrimeNumber(LIMIT).forEach(System.out::println);
        System.out.println();
        getPrimeNumber2(LIMIT).stream().forEach(System.out::println);
    }

    private static Set<Integer> getPrimeNumber(int n) {
        Set<Integer> set = new HashSet<>();

        for (int i = 2; i <= n; i++) {
            set.add(i);
        }

        for (int i = 2; i * i <= n; i++) {
            for (int j = i; j * i <= n; j++) {
                set.remove(j * i);
            }
        }

        return set;
    }

    private static BitSet getPrimeNumber2(int n) {
        BitSet bitSet = new BitSet(n);

        for (int i = 2; i <= n; i++) {
            bitSet.set(i);
        }

        for (int i = 2; i * i <= n; i++) {
            for (int j = i; j * i <= n; j++) {
                bitSet.clear(j * i);
            }
        }

        return bitSet;
    }
}