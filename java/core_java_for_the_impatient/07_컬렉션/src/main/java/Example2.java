import java.util.Arrays;
import java.util.List;
import java.util.ListIterator;

public class Example2 {

    public static void main(String[] args) {
        showIterator();
        showLoop();
        showReplaceAll();
    }

    private static List<String> init() {
        return Arrays.asList("a", "b", "c", "d");
    }

    private static void showReplaceAll() {
        List<String> list = init();
        list.replaceAll(String::toUpperCase);
        System.out.println(Arrays.toString(list.toArray()));
    }

    private static void showLoop() {
        List<String> list = init();
        for (int i = 0; i < list.size(); i++) {
            list.set(i, list.get(i).toUpperCase());
        }
        System.out.println(Arrays.toString(list.toArray()));
    }

    private static void showIterator() {
        List<String> list = init();
        ListIterator<String> it = list.listIterator();
        while(it.hasNext()) {
            String str = it.next();
            it.set(str.toUpperCase());
        }
        System.out.println(Arrays.toString(list.toArray()));
    }


}
