## 1. Thread Safe

Java는 보통 Multi Thread 환경이기 때문에 객체가 Thread Safe 유무가 굉장히 중요하고 잘 인지하고 코딩해야 한다.

그리고 어쩌다보니 PHP 하고 있는데... **과연 PHP는 이를 고려해야 할까?**

PHP [download page](https://windows.php.net/download/)에 가보면 `Thread Safe PHP`, `Non Thread Safe PHP`를 제공한다.

보통 IIS에서 FastCGI를 사용하는 경우 후자를 선택하고, 그 외에는 전자를 선택한다고 한다. 페이지 내용에 의하면 이러하다.

> TS refers to multithread capable builds. NTS refers to single thread only builds. Use case for TS binaries involves interaction with a multithreaded SAPI and PHP loaded as a module into a web server. For NTS binaries the widespread use case is interaction with a web server through the FastCGI protocol, utilizing no multithreading (but also for example CLI).

간단히 보자면 Thread Safe를 선택하는 경우, PHP과 SAPI(cgi 같은 중간 인터페이스)를 이용하여 apache와 nginx같은 웹 서버와 상호작용 된다는 말이다. **즉, Thread Safe 하다.**

## 2. Singleton

처음 PHP를 접했을 때, Apache(MPM 모듈을 prefork)를 사용하게 되었을 때, 싱글톤이 전혀 싱글톤이 아닌 것을 보았다. 어찌보면 당연하다. 멀티 프로세스니까..  (그리고 사용하지 말라고 권고한다.)

> 그런데
> 1. Apache(MPM 모듈이 work)라면?
> 2. Nginx를 사용하면?
> 3. PHP-FPM을 사용하면?

다르게 동작할까? 명확한 답을 찾지는 못 했지만 **PHP는 request가 들어올 때마다 매번 새로운 인스턴스를 생성**한다. 결과적으로 SAPI나 웹 서버는 프로세스를 효율적으로 관리하고 사용할 뿐이지 PHP에서 생성한 인스턴스를 프로세스 메모리에 적재하고 재사용하지는 않는다.
