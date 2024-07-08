
<script>
    import { goto } from '$app/navigation';
    import {onMount} from 'svelte';
    import axios from 'axios';
    import AccountAPI from  '../../../src/api/server/account-api';
    import {
		Button,
        Card,
        CardHeader,
        CardTitle,
        CardBody,
		CardFooter,
		CardSubtitle,
		CardText,
        Col,
        Container,
		Form,
		Input,
        Row
	} from '@sveltestrap/sveltestrap'

    let txtUserId;
    let txtUserNm;
    let txtPasswd;

    let txtTelNo;
    let txtEmail;
    let txtPostNo;
    let txtAddr1;
    let txtAddr2;

    const typeA = 4;
	const typeA1 = 3;
	const typeA2 = 9;

    function handleList(){
        goto("../"); //on:click={handleSubmit}
    }

    function handleInsert(){

        let userId = txtUserId.value;
        let userNm = txtUserNm.value;
        let passwd = txtPasswd.value;
       
        if(userId == null || userId == ""){
            alert("아이디를 입력하세요.");
            return;
        }else if(userNm == null || userNm == ""){
            alert("이름을 입력하세요.");
            return;
        }else if(passwd == null || passwd == ""){
            alert("비밀번호를 입력하세요.");
            return;
        }

        let content = {
            telNo  : txtTelNo.value,
            email : txtEmail.value,
            postNo : txtPostNo.value,
            addr1 : txtAddr1.value,
            addr2 : txtAddr2.value
        }
         
        let body = {
			userId: userId,
			userNm: userNm,
			passwd: passwd,
			content: content
		};

        let query = "userId="+userId;
        AccountAPI.lookup(query).then(response => {
           var cnt = response.data.cnt;
            if(cnt > 0){
                alert("아이디가 중복되었습니다.");
                return;
            }

            AccountAPI.add(body).then(response => {
                let resultCd = response.data.code;
                if(resultCd == 200){
                    alert("정상적으로 등록하였습니다.");
                    goto("../main");
                }else{
                    alert("회원가입에 실패하였습니다.");
                }
            });
        });
        /* axios({
            method: "get",
            url: "http://localhost:8888/account",
            params: {
                userId: userId
            }
        })
        .then((rep) => { return rep.data; })
        .then((data) => {
            let cnt = data[0].cnt;
            console.log("cnt: "+cnt);
            if(cnt > 0){
                alert("아이디가 중복되었습니다.");
                return;
            }
            let content = {
                telNo  : txtTelNo.value,
                email : txtEmail.value,
                postNo : txtPostNo.value,
                addr1 : txtAddr1.value,
                addr2 : txtAddr2.value
            }

            insertLogin(userId,userNm,passwd,content);
        }); */
    }

    /* function insertLogin(userId,userNm,passwd,content){
        console.log(content);
        axios({
            method: "post",
            url: "http://localhost:8888/account/add",
            data: {
                userId: userId,
                userNm: userNm,
                passwd: passwd,
                content: content
            }
            })
            .then((rep) => { return rep.data; })
            .then((data) => {
                alert("정상적으로 등록하였습니다.");
                goto("../main");
            });
    }
 */

    function findAddr(){
        new daum.Postcode({
            oncomplete: function(data) {
                
                console.log(data);
                
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
                // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var roadAddr = data.roadAddress; // 도로명 주소 변수
                var jibunAddr = data.jibunAddress; // 지번 주소 변수
                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                txtPostNo.value = data.zonecode;
                if(roadAddr !== ''){
                    txtAddr1.value = roadAddr;
                } 
                else if(jibunAddr !== ''){
                    txtAddr1.value = jibunAddr;
                }
            }
        }).open();
    }
    onMount(async()=>{
        txtUserId = document.querySelector("[name=userId]");
		txtUserNm = document.querySelector("[name=userNm]");
        txtPasswd = document.querySelector("input[name=passwd]");

        txtTelNo = document.querySelector("input[name=telNo");
        txtEmail = document.querySelector("input[name=email");
        txtPostNo = document.querySelector("input[name=postNo");
        txtAddr1 = document.querySelector("input[name=addr1");
        txtAddr2 = document.querySelector("input[name=addr2");
    })

</script>

<html lang="ko">
    <head>
        <script type="text/javascript" src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
		<title> 회원가입 </title>
	</head>

    <body>
        <Form id="form_comment">
            <Row class="justify-content-center" style="padding-top:100px;">
                <Col lg={4} sm={4}>
                    <Card>
                        <CardHeader> 
                            <CardTitle>회원가입</CardTitle>
                        </CardHeader>
                        <CardBody> 
                            <Row>
                                <Col lg={typeA1}>
                                    <span>사용자 아이디<span class="text-danger">*</span></span>
                                </Col>
                                <Col lg={typeA2}>
                                    <Input name="userId" id="userId" type="text" placeholder="사용자 아이디"> </Input>
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col lg={typeA1}>
                                    <span>사용자 이름<span class="text-danger">*</span></span>
                                </Col>
                                <Col lg={typeA2}>
                                    <Input name="userNm" id="userNm" type="text" placeholder="사용자 이름"> </Input>
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col lg={typeA1}>
                                    <span>비밀번호<span class="text-danger">*</span></span>
                                </Col>
                                <Col lg={typeA2}>
                                    <Input name="passwd" id="passwd" type="password" placeholder="비밀번호"> </Input>
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col lg={typeA1}>
                                    <span>핸드폰</span>
                                </Col>
                                <Col lg={typeA2}>
                                    <Input name="telNo" id="telNo" type="text" placeholder="핸드폰"> </Input>
                                </Col>
                            </Row>
                            <hr />
								<Row>
									<Col lg={typeA1}>
										<span>이메일</span>
									</Col>
									<Col lg={typeA2}>
										<Input name="email" id="email" type="text" placeholder="이메일"> </Input>
									</Col>
								</Row>
								<hr />
								<Row>
									<Col lg={typeA1}>
										<span>우편번호</span>
									</Col>
									<Col lg={typeA2}>
										<Input name="postNo" id="postNo" type="text" placeholder="우편번호" readonly> </Input>
									</Col>
								</Row>
								<hr />
								<Row>
									<Col lg={typeA1}>
										<span>주소</span>
									</Col>
									<Col lg={typeA2}>
										<div class="input-group">
											<Input name="addr1" id="addr1" type="text" placeholder="주소" readonly> </Input>
											<Button type="button" on:click={findAddr} color="warning">검색</Button>
										</div>
										
									</Col>
								</Row>
								<hr />
								<Row>
									<Col lg={typeA1}>
										<span>상세주소</span>
									</Col>
									<Col lg={typeA2}>
										<div class="input-group">
											<Input name="addr2" id="addr2" type="text" class="w-75"  placeholder="상세주소" readonly> </Input>
										</div>
									</Col>
								</Row>
                        </CardBody>
                        <CardFooter>
                            <Button type="button" on:click={handleInsert} color="success" >등록</Button>
                            <Button type="button" on:click={handleList}>목록</Button>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
            
        </Form>
    </body>
</html>