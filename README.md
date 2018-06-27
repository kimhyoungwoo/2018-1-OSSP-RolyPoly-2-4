# 2018-1-OSSP-RolyPoly-2-4

# 프로젝트명 : phaser3와 node_js를 이용한 웹게임 개발
node_js를 이용하여 server 생성 및 pahser3엔진을 활용하여 웹 게임 구현, socket_io를 이용한
mirty web game
## 팀원
김인제(Phaser3 Game) 2014112049 helios789@naver.com

김형우(Mirty Socket_Io) 2014112048 hwjw9599@naver.com

장현석(server node_js) 2014112067 gustjr1259@dongguk.edu

## 프로젝트 설명
저희 프로젝트는 node_js를 사용하여 서버를 구현하고, 서버에 올린 게임 구현은 phaser3물리 엔진을 활용하였습니다
또한 socket_io를 활용하여 혼자만의 게임이 아닌 다른 플레이어들과 함께 게임을 진행할 수 있도록 구현하였습니다
다른 플레이어가 게임을 하는 모습을 실시간으로 다른 플레이어들에게 보여줄 수 있으며, 자신의 게임이 종료됬더라도
메인으로 이동버튼을 누르기 전까지 다른 플레이어의 플레이를 볼수있도록 한 웹게임 입니다.

저희가 사용한 오픈소스는 (https://github.com/CSID-DGU/2017-2-OSSP-Awesome-1)을 사용하였습니다.

라이센스 : MIT License

문의 : 김인제(Phaser3 Game)

## 실행 방법
실제 게임 플레이(호스팅) : https://phaser-hosting.herokuapp.com/main으로 접속하여 mirty or solo button 클릭
사방에서 오는 적 패턴을 피해 살아남는 dodge 게임

게임 서버 생성(로컬 호스팅) : server.js파일 컴파일 후 로컬호스트 서버로 접속 후 위와 동일하게 진행

1.서버 접속

2.solo or mirty 버튼 클릭

3-1. solo클릭시 실행되는 게임 진행

3-2. mirty클릭시 다른 플레이어가 들오올때 까지 대기

4.다른 플레이어 모두 방에 접속시 4번째 player가 start버튼을 누르면 게임 진행
 
