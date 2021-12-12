> `MultipartException`을 `@ErrorHandler`에 잡히지 않는 이슈를 다뤄보고자한다.

우선 파일을 다뤄볼 일이 별로 없었기 때문에 제대로 인지하지 못횄는데, 이참에 ErrorHandler 동작에 대해서 같이 살펴볼 수 있는 계기가 되었다.

`MultipartException`는 Spring MVC에서 파일을 다룰때 볼 수 있는 예외 클래스이다.
주로 톰캣을 사용한다면, Request에서 파일을 다룰 떄 나오는 예외를 `MultipartException`를 변형(?)하여 스프링에서 핸들링할 수 있도록 도와준다.

여기서 약간의 문제가 있는데, 이게 단순히 `@ExceptionHandler`에 등록하면 끝이겠지 하면 큰 오산이다...

파일 처리 과정은 여러 시점에서 처리 할 수 있는데, 기본적으로 `DispatcherServlet`에서 올바른 handler를 찾는 것보다 우선순위가 높다.

참고: https://github.com/spring-projects/spring-framework/blob/5.3.x/spring-webmvc/src/main/java/org/springframework/web/servlet/DispatcherServlet.java#L1039...L1047
```java
processedRequest = checkMultipart(request); // <-- 파일 체크
multipartRequestParsed = (processedRequest != request);

// Determine handler for the current request.
mappedHandler = getHandler(processedRequest); // <-- 요청에 대한 올바른 핸들러 지정
if (mappedHandler == null) {
  noHandlerFound(processedRequest, response);
  return;
}
```

그래서 `checkMultipart` 파일 체크를 하는 중에 예외가 발생하면서 `mappedHandler = getHandler(processedRequest);` 이 코드가 실행되지 않는다.
그리고 핸들러를 찾지 못한채 다음 프로세스를 진행한다.

```java
processDispatchResult(processedRequest, response, mappedHandler, mv, dispatchException); // `mappedHandler` 가 빈 상태
```

예외가 밣생했다면 `HandlerExceptionResolver`를 순회화면서 알맞는 에러에 대한 `ModelAndView`를 만드는데, 위에서 `mappedHandler` 이 비어있기 때문에 아무것도 찾기 못한채 톰캣 에러가 발생한다.

참고: https://github.com/spring-projects/spring-framework/blob/5.3.x/spring-webmvc/src/main/java/org/springframework/web/servlet/mvc/method/annotation/ExceptionHandlerExceptionResolver.java#L470

그래서 이를 해결하려면, 현재 방법은 하나뿐인 것 같다.

```properties
spring.servlet.multipart.resolve-lazily=true # 해당옵션을 기본적으로 false이다.
``` 
 
해당 옵션은 `checkMultipart`에서 `MultipartResolver`를 따라가보면 알 수 있는데 그 시점에 파일을 체크하지 않는다. 그리고 실제 파라미터를 액세스하는 타이밍과 동일한 시점에 체크하게 해준다.

참고: https://github.com/spring-projects/spring-framework/blob/5.3.x/spring-web/src/main/java/org/springframework/web/multipart/support/StandardMultipartHttpServletRequest.java#L87

위 이슈 내용은 인터셉터 또한 동작하지 않는다는 이슈가 생긴바 있으며, 스프링의 창시자 또한 위 옵션을 사용하라고 언급하고 있다. 그런데 이 이슈룰 해결할 니즈가 생겼는지 해당 이슈가 클로즈됐음에도 액션(?)이 있는데.. 

https://github.com/spring-projects/spring-framework/issues/8002

잘 모르겠다.. 우선 subscribe만 해두는 걸로... 마무리


