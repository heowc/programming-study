import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Example4 {

    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>();

        for (int i = 0; i < 6; i++) {
            list.add(i);
        }

//        for (Integer number : list) {
//            if (number == 3) list.remove(number);
//        }

        Iterator<Integer> it = list.iterator();
        while (it.hasNext()) {
            if (it.next() == 3) {
                it.remove();
            }
        }

        list.forEach(System.out::print);
    }
}
