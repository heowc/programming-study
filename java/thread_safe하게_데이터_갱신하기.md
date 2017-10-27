# thread safe 하게 데이터 갱신하기

멀티 스레드 환경에서 데이터를 갱신하기란 테스트하기도 어렵고 간과하기 쉬운 얘기이다.

## 고려해야 될 것

1. 모든 스레드가 데이터를 갱신할 수 있다.
2. 다른 스레드에 있어서 데이터가 갱신되면 안된다.
3. 데이터를 읽는 동안 다른 스레드는 읽기 못 하도록 해야한다.

### 1. synchronized

- 변수 단위나 메소드 단위에 `synchronized` 키워드를 추가함으로써, 이를 해결할 수 있다.

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Main {

	private static Integer count = 0;

	public static void main(String[] args) throws InterruptedException {
		ExecutorService service = Executors.newFixedThreadPool(10);
		Runnable runnable = () -> {
			synchronized (count) {
				count++;
			}
		};

		for (int i = 0; i < 100; i++) {
			service.execute(runnable);
		}

		Thread.sleep(2000L);
		service.shutdown();

		System.out.println(count);
	}
}
```

### 2. ReentrantLock

- __Lock 인터페이스__ 를 구현한 `ReentrantLock`를 사용함으로써, 이를 해결할 수 있다.
- `ReentrantLock`, `ReentrantReadWriteLock` 등이 있다.

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.locks.ReentrantLock;

public class Main {

	private static Integer count = 0;
	private static ReentrantLock rl = new ReentrantLock();

	public static void main(String[] args) throws InterruptedException {

		ExecutorService service = Executors.newFixedThreadPool(10);
		Runnable runnable = () -> {
			try {
				rl.lock();
				count++;
			} finally {
				rl.unlock();
			}
		};

		for (int i = 0; i < 100; i++) {
			service.execute(runnable);
		}

		Thread.sleep(2000L);
		service.shutdown();

		System.out.println(count);
	}
}

```


### 2. AtomicInteger

- __원자성(atomic)__ 을 해결하기 위해 사용된다.
- `AtomicInteger`, `AtomicBoolean`, `AtomicLong` 등이 있다.

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;

public class Main {

	private static AtomicInteger integer = new AtomicInteger();

	public static void main(String[] args) throws InterruptedException {
		ExecutorService service = Executors.newFixedThreadPool(10);
		Runnable runnable = () -> integer.incrementAndGet();

		for (int i = 0; i < 100; i++) {
			service.execute(runnable);
		}

		Thread.sleep(2000L);
		service.shutdown();

		System.out.println(integer.get());
	}
}
```

## 결론

`java.util.concurrent`패키지에는 __멀티 스레드 환경에서 데이터의 원자성을 보장__ 하기 위한 API를 확인 해볼 수 있다.
