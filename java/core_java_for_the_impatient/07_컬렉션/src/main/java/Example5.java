import java.util.ArrayList;
import java.util.List;

public class Example5 {

    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>();

        for (int i = 0; i < 10; i++) {
            list.add(i);
        }

        list.forEach(System.out::print);
        swap(list, 0, 9);
        System.out.println();
        list.forEach(System.out::print);
    }

    private static <T> void swap(List<T> list, int i, int j) {
        T temp = list.get(i);
        list.set(i, list.get(j));
        list.set(j, temp);
    }
}
