import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class Example3 {

    public static void main(String[] args) {
        Set<Integer> baseSet = new HashSet<>();

        baseSet.addAll(Arrays.asList(1, 3, 5 , 7, 9));
        baseSet.forEach(System.out::print);

        System.out.println();

        baseSet.removeAll(Arrays.asList(1, 3));
        baseSet.forEach(System.out::print);

        System.out.println();

        baseSet.retainAll(Arrays.asList(5, 6, 7));
        baseSet.forEach(System.out::print);
    }
}
