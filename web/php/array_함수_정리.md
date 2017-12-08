특이하게 **array()** 예약어는 List나 Map 등의 존재가 될 수 있다. 또한 다양한 함수들을 제공하는데 이를 정리해보자.

※ DS라고 해서 data structure가 구현되어 있다. (의존성 추가 작업 필요하다.)

### array_change_key_case

키를 대/소문자로 변경해준다. (기본값:소문자)

※ array안에 array까지는 변경이 안된다.

### array_chunk

size만큼 array를 쪼개준다. (java진영의 Guava 라이브러리 - Lists.partition과 비슷)

### array_column

array의 형태를 colum을 기준으로 새로운 array를 만들어준다.

※ array_map 비슷

```php
$records = array(
    array(
        'id' => 2135,
        'first_name' => 'John',
        'last_name' => 'Doe',
    ),
    array(
        'id' => 3245,
        'first_name' => 'Sally',
        'last_name' => 'Smith',
    ),
    array(
        'id' => 5342,
        'first_name' => 'Jane',
        'last_name' => 'Jones',
    ),
    array(
        'id' => 5623,
        'first_name' => 'Peter',
        'last_name' => 'Doe',
    )
);

$first_names = array_column($records, 'first_name');
```

### array_map

콜백 함수로 새로운 형태의 array 생성(lambda function / java 진영의 Stream.map과 비슷)

```php
$func = function($value) {
    return $value * 2;
};

array_map($func, range(1, 5));
```

### array_filter

콜백 함수로 array의 값으로 필터링 처리하여 새로운 형태의 array 생성 (lambda function / java 진영의 Stream.filter와 비슷)

```php
function odd($var)
{
    return ($var & 1);
}

function even($var) {
    return (!($var & 1));
}

$array1 = array("a"=>1, "b"=>2, "c"=>3, "d"=>4, "e"=>5);
$array2 = array(6, 7, 8, 9, 10, 11, 12);

echo "홀수:\n";
print_r(array_filter($array1, "odd"));
echo "짝수:\n";
print_r(array_filter($array2, "even"));
```

### array_key_exists / key_exists

key가 해당 arrray에 존재하는지 여부 판단 (map형태로 사용할 때 유용)

### array_keys

array에서 key로 구성된 별도의 array 생성

### array_values

array에서 value로 구성된 별도의 array 생성

### array_merge

array에 다른 array를 병합해서 array생성(java진영의 List.addAll와 비슷한 형태로 사용하면 유용)

### array 삽입/제거

array_push : 뒤로 넣음
array_pop : 뒤로 빼냄
array_unshift : 앞으로 넣음
array_shift : 앞에서 빼냄

### array 내부 값 계산

array_product : 값들을 곱해준다. 비어있다면 1을 반환
array_sum : 값들을 더해준다.

### array_reduce

콜백함수로 array의 반복적인 처리하여 반환 (lambda function / java 진영의 Stream.reduce와 비슷)

### array_replace

array의 값을 다른 array를 이용하여 값을 변경

```php
$base = array("orange", "banana", "apple", "raspberry");
$replacements = array(0 => "pineapple", 4 => "cherry");
$replacements2 = array(0 => "grape");

$basket = array_replace($base, $replacements, $replacements2);
```

```text
Array
(
    [0] => grape
    [1] => banana
    [2] => apple
    [3] => raspberry
    [4] => cherry
)
```

### array 정렬

- array_reverse : 역정렬된 array 생성

- sort : array 정렬
- rsort : array 역정렬
- ksort : 키에 의한 array 정렬
- krsort : 키에 의한 array 역정렬

- shuffle : 임의로 섞음

- usort : 사용자 정의 비교 함수를 사용하여 값에 대한 array 정렬
- uksort : 사용자 정의 비교 함수를 사용하여 키에 대한 array 정렬
- uasort : 사용자 정의 비교 함수를 사용하여 정렬하고 인덱스 연관성 유지

- asort : 정렬하고 인덱스 연관성 유지
- arsort : 역정렬하고 인덱스 연관성 유지

- natsort : 자연순 정렬
- natcasesort : 대소문자 구분없이 자연순 정렬

> 자연순 정렬은 무엇인가?

길이까지 고려한 정렬이라고 보는게 가장 쉬운 듯 하다.


> 인덱스 연관성을 유지한다는 말은 무엇인가?

sort, rsort을 해보면 키의 값이 인덱스 값으로 변경된다. (주의가 필요할 듯)
그래서 map형태의 array는 sort보다는 XaXXX형태의 sort함수를 사용해야 할 것 같다.

### array_search

값을 array에서 검색 후 키를 반환

### array_slice

array의 일부를 새로운 array 생성(copy array 용도?)

### array_splice

array의 일부를 삭제한 새로운 array 생성

### array_unique

중복값 제거

### array_walk

별도의 스코프(?)로 array의 각 원소에 특정 함수를 적용

### in_array

배열에 값이 존재 여부 판단(+ 자료형 까지 판단 가능)

※ array_search와 비슷한 함수

```php
$a = array('1.10', 12.4, 1.13);

if (in_array('12.4', $a, true)) {
    echo "'12.4' found with strict check\n";
}

if (in_array(1.13, $a, true)) {
    echo "1.13 found with strict check\n";
}
```

```text
1.13 found with strict check
```

### array - iterator(?)

current : 현재 위치
pos : current와 동일
next : 다음 위치
prev : 이전 위취
end : 마지막 위치
reset : 처음 위치

key : 현재 위치의 키

### list

~~설명으론 이해가 안됨.~~ array의 값을 별도의 스코프에서 꺼내쓸 때 사용

```php
$result = mysql_query ("SELECT id, name, salary FROM employees", $conn);
while (list ($id, $name, $salary) = mysql_fetch_row ($result)) {
    echo " <tr>\n" .
          "  <td><a href=\"info.php?id=$id\">$name</a></td>\n" .
          "  <td>$salary</td>\n" .
          " </tr>\n";
}
```

### range

일정 step으로 범위의 값을 가진 array 생성

```php
// array(0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100)
foreach (range(0, 100, 10) as $number) {
    echo $number;
}
```

### 갯수

- count : array 모든 원소나 프로퍼티의 갯수
- sizeof : count와 동일

※ count나 sizeof는 호출할때 마다, 다시 계산을 하므로, 다음과 같이 작성해야한다.

```php
$count = count($list);
for ($i = 0; $i < $count; $i++) {
    // ...
}
```
