# SQL Injection

웹 애플리케이션의 취약점을 이용하여 SQL을 삽입하는 공격을 말한다.

SQL Injection는 [OWASP(The Open Web Application Security Project)](https://ko.wikipedia.org/wiki/OWASP)에서 발표한 OWASP TOP 10에 포함될 정도로 쉽게 간과할 수 있고, 큰 영향을 줄 수 있는 취약점 중에 하나이다.

## 예제

다음과 같은 API가 있다고 가정하자.

```http
http://www.example.com/article?keyword={keyword}
```

그리고 간단하게 게시글의 제목을 '예제' 라는 단어가 들어가는 것을 조회하는 쿼리를 작성하자.

```sql
SELECT  SEQ
		, TITLE
		, CONTENT
FROM    ARTICLE
WHERE   TITLE LIKE '%예제%'
```

하지만 __다른 의도__ 로 사용될 수 있다.

```sql
SELECT  SEQ
		, TITLE
		, CONTENT
FROM    ARTICLE
WHERE   TITLE LIKE '%1' UNION SELECT FROM * ARTICLE;--%'
```

'keyword' 에 __1' UNION SELECT FROM * ARTICLE;--__ 를 넣음으로써, 모든 게시글을 가져오게 된다.

예제는 단순히 ARTICLE을 가져오는 것이라고 볼 수 있지만, 큰 범위에서 보면 다른 테이블의 데이터를 탈취할 수 도 있다는 말이 된다.

## 해결법

이런 취약점을 고려해서 코딩하는 것을 `시큐어코딩`이라고 한다.

Java를 사용하는 경우, 한국인터넷진흥원에서 가이드를 내놓은 것이 있으니 참고해도 좋다. ([한국인터넷진흥원 - JAVA 시큐어코딩 가이드](https://www.kisa.or.kr/public/laws/laws3_View.jsp?mode=view&p_No=259&b_No=259&d_No=55&ST=T&SV=))

#### 1. JDBC - 문제점

```java
Connection conn;
Statement stmt;

// .. DB 정보를 넣었다고 가정

stmt = conn.createStatement("SELECT SEQ, TITLE, CONTENT FROM ARTICLE WHERE TITLE LIKE '%" + keyword + "%'");
```

#### 1. JDBC - 해결법

```java
Connection conn;
PreparedStatement pstmt;

// .. DB 정보를 넣었다고 가정

pstmt = conn.prepareStatement("SELECT SEQ, TITLE, CONTENT FROM ARTICLE WHERE TITLE LIKE ?");
pstmt.setString(1, "%" + keyword + "%");
```

`'`의 경우 문자열 처리가 된다.(`\'`)

#### 2. xBatis - 문제점

```xml
<select>
	<![CDATA[
	SELECT  SEQ
			, TITLE
			, CONTENT
	FROM    ARTICLE
	WHERE   TITLE LIKE '%${keyword}%'
	]]>
</select>
```

#### 2. xBatis - 해결법

```xml
<select>
	<![CDATA[
	SELECT  SEQ
			, TITLE
			, CONTENT
	FROM    ARTICLE
	WHERE   TITLE LIKE '%' || #{keyword} || '%'
	]]>
</select>
```

데이터베이스 특성마다 다르니 알맞게 참고하자

```sql
-- [MySQL]
TITLE LIKE CONCAT('%', #{keyword}, '%')

-- [Oracle]
TITLE LIKE '%' || #{keyword} || '%'

-- [MSSQL]
TITLE LIKE '%' + #{keyword} + '%'
```

xBatis의 경우 `$`와 `#`의 차이를 알아야 한다.
`$`와 `#`는 JDBC 사용 시, `Statement`와 `PreparedStatement`를 사용하는 것과 동일하다.

#### 3. 계정

적당한 권한을 가진 계정을 사용한다.(`DROP TABLE ARTICLE`이 가능하다면...? 참담한 결과가 나올 것이다.)

#### 4. 검증

해당 필드에 대한 데이터 검증을 한다. 간단하게는 문자열 길이를 검증할 수 도 있고, __SQL 예약어나 특수 문자__ 존재 여부를 검증할 수 도 있을 것 이다.

```java
private static final String SPECIAL_CHARS_REGEX = "['\"\\-#()@;=*/+]";
private static final String SQL_INJECTION_REGEX = "(UNION|SELECT|TABLE|UPDATE|FROM|WHERE)";
private static final String EMPTY_STRING = "";

public static boolean isSqlInjection(String param) {
	String replacedParam = param.replaceAll(SPECIAL_CHARS_REGEX, EMPTY_STRING);
	Pattern pattern = Pattern.compile(SQL_INJECTION_REGEX);
	Matcher matcher = pattern.matcher(replacedParam.toUpperCase());
	return matcher.find();
}
```

## 참고

- OWASP : https://ko.wikipedia.org/wiki/OWASP
- 한국인터넷진흥원 : https://www.kisa.or.kr/public/laws/laws3_View.jsp?mode=view&p_No=259&b_No=259&d_No=55&ST=T&SV=
