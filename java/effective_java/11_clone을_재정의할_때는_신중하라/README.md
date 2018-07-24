# clone을 재정의할 때는 신중하라

`Cloneable`은 어떤 객체가 복제(clone)를 허용한다는 사실을 알리는 데 쓰려고 고안된 믹스인 인터페이스이다.

## `clone` 정의하는 방법

`Cloneable`을 구현하면, 해당을 객체를 필드 단위로 복사한 객체를 반환하고, 구현하지 않으면 `CloneNotSupportedException`을 던진다.

```java
// ...

@Override
public PhoneNumber clone() {
    try {
        return (PhoneNumber) super.clone();
    } catch (CloneNotSupportedException e) {
        throw new AssertionError();
    }
}

// ...
```

실질적으로 `Cloneable` 인터페이스를 구현하는 클래스는 제대로 동작하는 public clone 메소드를 제공해야 한다.

> 라이브러리(API?)가 할 수 있는 일을 클라이언트에게 미루지 말자

## Collection에서 `clone` 정의하는 방법

`clone`은 또 다른 형태의 생성자다. 원래 객체를 손상시키는 일이 없도록 해야하고, 복사본의 불변식도 제대로 만족시켜야 한다.

```java
@Override
public Stact clone() {
    try {
        Stack result = (Stack) super.clone();
        result.elements = elements.clone();
        return result;
    } catch (CloneNotSupportedException e) {
        throw new AssertionError();
    }
}
```

`clone`은 변경 가능한 객체를 참조하는 final 필드의 일반적 용법과 호환되지 않는다. 즉, 복제 가능한 클래스를 만들려면 필드의 final 선언을 지워야 한다.

> 연결 리스트를 복제하기 위해서는 깊은 복사를 해야하는데, 이는 좋은 방법이 아니다. 그 이유는 리스트 원소마다 스택 프레임을 하나씩 사용하기 때문이다.

## 그 외

다중 스레드에서 안전해야 하는(thread safe) 클래스를 `Cloneable`로 만들려면 `clone`에도 동기화 메커니즘을 적용해야 한다. (규칙 66참고)

<br>

`clone`은 되도록이면 객체를 복사할 대안을 제공하거나, 아예 복제 기능을 제공하지 않는 것이 낫다. 복제를 지원하는 좋은 방법은 **복사 생성자**나 **복사 팩토리**를 제공하는 것이다.