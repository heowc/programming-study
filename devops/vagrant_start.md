### Vagrant

단일 워크 플로에서 가상 컴퓨터 환경을 작성하고 관리하기 위한 도구이다.

### 사용 방법

**Docker**에서 `Dockerfile`을 작성하듯, **Vagrant**에서는 `Vagrantfile`을 작성한다.
- Ruby 기반
- network, ssh, shard folder, virtual machine 등의 다양한 설정([Vagrant - docs](https://www.vagrantup.com/docs/vagrantfile/) 참고)

### 사전 개념

**provider**: 가상환경을 제공해주는 공급자. 다음과 같은 다양한 provider에서 활용할 수 있다.

- VMWare
- VirtualBox
- Hyper-v
- docker
- ...

**box**: 가상머신에 올려지는 하나의 운영체제 이미지와 가상머신 설정이 포함된 기본 템플릿(?)를 말한다. [Vagrant Cloud](https://app.vagrantup.com/boxes/search)에서 여러가지 box를 확인할 수 있으며, 혹은 custom box 또한 만들 수 있다.

**plugin**: 자체적으로 제공하지 않는 기능을 사용자들이 오픈소스화하여 여러가지 기능을 제공한다.

- vagrant-vbguest
- vagrant-docker-compose
- vagrant-triggers
- ...

### 명령어

##### Vagrant 만들기/초기화

```bash
$ vagrant init
```

##### 가상머신 추가

```bash
$ vagrant up
$ vagrant up --debug // 디버깅 모드로 실행
```

※ 관리자 권한으로 실행하게 되면 Oracle VirtualBox의 GUI 인터페이스에서 보이지 않는다.

##### 재시작

```bash
$ vagrant reload
$ vagrant reload --provision // provision 변경사항을 적용하며 재시작
```

##### 가상머신 삭제

```bash
$ vagrant destroy
```

##### provision(shell 등) 변경사항 적용

```bash
$ vagrant provision
```

##### ssh 접속

```bash
$ vagrant ssh
```

### 맛보기

Vagrant를 이용하여 `ubuntu-16.04` 가상머신을 띄워보자.

##### 1. 디렉토리 생성

```bash
$ mkdir ubuntu1604_base
$ cd ubuntu1604_base
```

##### 2. Vagrant 생성

```bash
$ vagrant init

or

$ vagrant init bento/ubuntu-16.04
```

Vagrant 생성시, 바로 box를 지정할 수 있다. 한 번 다운 받은 box는 로컬에 저장되며 이후에는 다운 받지 않아도 된다. (하나의 box는 수백 메가정도 된다.)

다음은 **box관련 명령어**이다.

```bash
$ vagrant box list // 받은 box 목록 보기
$ vagrant box add bento/ubuntu-16.04 // 해당 box 추가
$ vagrant box remove bento/ubuntu-16.04 // 해당 box 제거
```

##### 3. Vagrantfile 수정

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "bento/ubuntu-16.04"
end
```

다음과 같은 설정만으로 `ubuntu-16.04` 가상머신을 만들 수 있는 기반을 갖춰진 셈이다.

##### 4. 가상머신 추가/ssh 접속

```bash
$ vagrant up

VM Created...!

$ vagrant ssh

SSH Connected...!

[ubuntu1604_base]: $
```

설치된 가상머신을 자동으로 잡아주며, 설정에 따른 가상머신을 띄워준다.

### 참고

[vagrant-sample](https://github.com/heowc/vagrant-sample)
