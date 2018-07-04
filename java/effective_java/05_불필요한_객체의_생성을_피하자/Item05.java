
public class Item05 {

    public static void main(String[] args) {
        Long sum = 0L;

        for (int i = 0; i < Integer.MAX_VALUE; i++) {
            sum += i;
        }
    }
}