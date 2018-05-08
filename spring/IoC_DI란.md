아래 내용은 자바에서 주로 사용하는 프레임워크인 스프링과 관련하여 작성합니다.

## 사전 개념
1. 자바는 톰캣이라는 서블릿 컨테이너에 의존하여 애플리케이션을 실행할 수 있습니다.
2. 톰캣은 기본적으로 단일 프로세스 안에서 멀티 쓰레드로 동작합니다.

## 예시 - Servlet
어떤 사용자가 데이터에 요청한다면 서블릿에서 어떤 식으로 동작하게 될까요? Thread 안에서 만들어진 객체는 자동 소멸됩니다.

그렇다면 자주 사용되는 클래스를 싱글톤으로 만드는 것이 좋을 것 같습니다. 간단하게 싱글톤을 만들어 보도록 하겠습니다.

```java
public class Repository {

    private static Repository instance = new Repository(); // 초기화

    private Repository() {} // 생성자

    public static Repository getInstance() {
        return instance;
    }

    public List<Data> findAll() {
        // ...
    }
}
```

```java
public class Service {

    private Respository repository;

    public Service() {
        this.repository = Repository.getInstance();
        // 혹은 Service 클래스를 호출해주는 클래스에서 생성자를 통해 Repository를 넘어준다.
    }

    public List<Data> findAll() {
        return repository.findAll();
    }
}
```
`Repository`를 싱글톤으로 만들면 매번 동일 객체를 가져와 효율적으로 사용할 수 있습니다. 하지만, 매번 싱글톤을 만드는 것은 위와 같은 코드를 베이스로 작성하니 귀찮고, 생성자를 통해 넘겨주더라도 꼬리에 꼬리 물기식으로 더 보기 힘든 코드가 작성될 수 있을 것 같습니다. 이렇게 작성하지 않거니와 누군가가 이를 만들어주고 관리해주면 얼마나 좋을까요?

## 예시 - Spring
Spring 내부에서는 객체를 등록하고 관리할 수 있습니다. 그리고 이를 관리해주는 곳을 **빈 팩토리(BeanFactory)**, 등록된 객체들은 **빈(Bean)** 이라고 칭합니다.

빈을 빈 팩토리에 등록하는 방법은 아래와 같습니다.

1. 자동 스캔
2. 직접 등록 - (java code, xml)
등록하는 방법이 요점은 아니니, **자동 스캔** 설정이 되었다고 가정하고 위 코드를 바꿔서 작성해 보겠습니다.

```java
@Repository // @Component, @Service, @Repository, ...
public class Repository {

    // ...

    public List<Data> findAll() {
        // ...
    }
}
```

```java

@Service // @Component, @Service, @Repository, ...
public class Service {

    @Autowired // @Inject, @Resource, ...
    private Respository repository;

    public List<Data> findAll() {
        return repository.findAll();
    }
}
```
간단히 설명을 드리자면,

1. `@Component`등의 애노테이션을 클래스에 선언하면 애플리케이션이 구동될 때, 클래스들을 하나하나 스캔하여 빈으로 등록하게 됩니다. 
2. 사용하고자하는 클래스에서는 `@Autowired`를 사용하여 기본적으로 매번 동일한 객체를 가져올 수 있습니다. (필드 주입)

## 결론
Spring을 사용하게 되면 **빈으로 등록된 객체들은 서블릿과는 별개로 빈 팩토리에서 관리(IoC Container)** 가 됩니다. 또한, 이와 동시에 **의존성 주입(Dependency Injection)이 가능**하기 때문에 하나의 클래스에 다른 클래스가 의존성을 갖지 않게 됩니다.
