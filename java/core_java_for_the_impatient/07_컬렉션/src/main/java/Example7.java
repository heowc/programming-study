import java.util.Map;
import java.util.TreeMap;

public class Example7 {

    public static void main(String[] args) {
        String content = "a b a b c d e";

        String[] array = content.split(" ");

        Map<String, Integer> map = new TreeMap<>();

        for (String str : array) {
            map.merge(str, 1, Integer::sum);
        }

        map.forEach((key, value) -> System.out.printf("%s : %d\n", key, value));
    }
}
